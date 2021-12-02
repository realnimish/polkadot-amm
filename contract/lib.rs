#![cfg_attr(not(feature = "std"), no_std)]
#![allow(non_snake_case)]

use ink_lang as ink;

const PRECISION: u128 = 1_000_000; // Precision of 6 digits

#[ink::contract]
mod amm {
    use ink_storage::collections::HashMap;

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        /// Zero Liquidity
        ZeroLiquidity,
        /// Amount cannot be zero!
        ZeroAmount,
        /// Insufficient amount
        InsufficientAmount,
        /// Equivalent value of tokens not provided
        NonEquivalentValue,
        /// Asset value less than threshold for contribution!
        ThresholdNotReached,
        /// Share should be less than totalShare
        InvalidShare,
        /// Insufficient pool balance
        InsufficientLiquidity,
        /// Slippage tolerance exceeded
        SlippageExceeded,
    }

    #[derive(Default)]
    #[ink(storage)]
    pub struct Amm {
        totalShares: Balance, // Stores the total amount of share issued for the pool
        totalToken1: Balance, // Stores the amount of Token1 locked in the pool
        totalToken2: Balance, // Stores the amount of Token2 locked in the pool
        shares: HashMap<AccountId, Balance>, // Stores the share holding of each provider
        token1Balance: HashMap<AccountId, Balance>, // Stores the token1 balance of each user
        token2Balance: HashMap<AccountId, Balance>, // Stores the token2 balance of each user
        fees: Balance,        // Percent of trading fees charged on trade
    }

    #[ink(impl)]
    impl Amm {
        // Ensures that the _qty is non-zero and the user has enough balance
        fn validAmountCheck(
            &self,
            _balance: &HashMap<AccountId, Balance>,
            _qty: Balance,
        ) -> Result<(), Error> {
            let caller = self.env().caller();
            let my_balance = *_balance.get(&caller).unwrap_or(&0);

            match _qty {
                0 => Err(Error::ZeroAmount),
                _ if _qty > my_balance => Err(Error::InsufficientAmount),
                _ => Ok(()),
            }
        }

        // Returns the liquidity constant of the pool
        fn getK(&self) -> Balance {
            self.totalToken1 * self.totalToken2
        }

        // Used to restrict withdraw & swap feature till liquidity is added to the pool
        fn activePool(&self) -> Result<(), Error> {
            match self.getK() {
                0 => Err(Error::ZeroLiquidity),
                _ => Ok(()),
            }
        }
    }

    impl Amm {
        /// Constructs a new AMM instance
        /// @param _fees: valid interval -> [0,1000)
        #[ink(constructor)]
        pub fn new(_fees: Balance) -> Self {
            // Sets fees to zero if not in valid range
            Self {
                fees: if _fees >= 1000 { 0 } else { _fees },
                ..Default::default()
            }
        }

        /// Sends free token(s) to the invoker
        #[ink(message)]
        pub fn faucet(&mut self, _amountToken1: Balance, _amountToken2: Balance) {
            let caller = self.env().caller();
            let token1 = *self.token1Balance.get(&caller).unwrap_or(&0);
            let token2 = *self.token2Balance.get(&caller).unwrap_or(&0);

            self.token1Balance.insert(caller, token1 + _amountToken1);
            self.token2Balance.insert(caller, token2 + _amountToken2);
        }

        /// Returns the balance of the user
        #[ink(message)]
        pub fn getMyHoldings(&self) -> (Balance, Balance, Balance) {
            let caller = self.env().caller();
            let token1 = *self.token1Balance.get(&caller).unwrap_or(&0);
            let token2 = *self.token2Balance.get(&caller).unwrap_or(&0);
            let myShares = *self.shares.get(&caller).unwrap_or(&0);
            (token1, token2, myShares)
        }

        /// Returns the amount of tokens locked in the pool,total shares issued & trading fee param
        #[ink(message)]
        pub fn getPoolDetails(&self) -> (Balance, Balance, Balance, Balance) {
            (
                self.totalToken1,
                self.totalToken2,
                self.totalShares,
                self.fees,
            )
        }

        /// Returns amount of Token1 required when providing liquidity with _amountToken2 quantity of Token2
        #[ink(message)]
        pub fn getEquivalentToken1Estimate(
            &self,
            _amountToken2: Balance,
        ) -> Result<Balance, Error> {
            self.activePool()?;
            Ok(self.totalToken1 * _amountToken2 / self.totalToken2)
        }

        /// Returns amount of Token2 required when providing liquidity with _amountToken1 quantity of Token1
        #[ink(message)]
        pub fn getEquivalentToken2Estimate(
            &self,
            _amountToken1: Balance,
        ) -> Result<Balance, Error> {
            self.activePool()?;
            Ok(self.totalToken2 * _amountToken1 / self.totalToken1)
        }

        /// Adding new liquidity in the pool
        /// Returns the amount of share issued for locking given assets
        #[ink(message)]
        pub fn provide(
            &mut self,
            _amountToken1: Balance,
            _amountToken2: Balance,
        ) -> Result<Balance, Error> {
            self.validAmountCheck(&self.token1Balance, _amountToken1)?;
            self.validAmountCheck(&self.token2Balance, _amountToken2)?;

            let share;
            if self.totalShares == 0 {
                // Genesis liquidity is issued 100 Shares
                share = 100 * super::PRECISION;
            } else {
                let share1 = self.totalShares * _amountToken1 / self.totalToken1;
                let share2 = self.totalShares * _amountToken2 / self.totalToken2;

                if share1 != share2 {
                    return Err(Error::NonEquivalentValue);
                }
                share = share1;
            }

            if share == 0 {
                return Err(Error::ThresholdNotReached);
            }

            let caller = self.env().caller();
            let token1 = *self.token1Balance.get(&caller).unwrap();
            let token2 = *self.token2Balance.get(&caller).unwrap();
            self.token1Balance.insert(caller, token1 - _amountToken1);
            self.token2Balance.insert(caller, token2 - _amountToken2);

            self.totalToken1 += _amountToken1;
            self.totalToken2 += _amountToken2;
            self.totalShares += share;
            self.shares
                .entry(caller)
                .and_modify(|val| *val += share)
                .or_insert(share);

            Ok(share)
        }

        /// Returns the estimate of Token1 & Token2 that will be released on burning given _share
        #[ink(message)]
        pub fn getWithdrawEstimate(&self, _share: Balance) -> Result<(Balance, Balance), Error> {
            self.activePool()?;
            if _share > self.totalShares {
                return Err(Error::InvalidShare);
            }

            let amountToken1 = _share * self.totalToken1 / self.totalShares;
            let amountToken2 = _share * self.totalToken2 / self.totalShares;
            Ok((amountToken1, amountToken2))
        }

        /// Removes liquidity from the pool and releases corresponding Token1 & Token2 to the withdrawer
        #[ink(message)]
        pub fn withdraw(&mut self, _share: Balance) -> Result<(Balance, Balance), Error> {
            let caller = self.env().caller();
            self.validAmountCheck(&self.shares, _share)?;

            let (amountToken1, amountToken2) = self.getWithdrawEstimate(_share)?;
            self.shares.entry(caller).and_modify(|val| *val -= _share);
            self.totalShares -= _share;

            self.totalToken1 -= amountToken1;
            self.totalToken2 -= amountToken2;

            self.token1Balance
                .entry(caller)
                .and_modify(|val| *val += amountToken1);
            self.token2Balance
                .entry(caller)
                .and_modify(|val| *val += amountToken2);

            Ok((amountToken1, amountToken2))
        }

        /// Returns the amount of Token2 that the user will get when swapping a given amount of Token1 for Token2
        #[ink(message)]
        pub fn getSwapToken1EstimateGivenToken1(
            &self,
            _amountToken1: Balance,
        ) -> Result<Balance, Error> {
            self.activePool()?;
            let _amountToken1 = (1000 - self.fees) * _amountToken1 / 1000; // Adjusting the fees charged

            let token1After = self.totalToken1 + _amountToken1;
            let token2After = self.getK() / token1After;
            let mut amountToken2 = self.totalToken2 - token2After;

            // To ensure that Token2's pool is not completely depleted leading to inf:0 ratio
            if amountToken2 == self.totalToken2 {
                amountToken2 -= 1;
            }
            Ok(amountToken2)
        }

        /// Returns the amount of Token1 that the user should swap to get _amountToken2 in return
        #[ink(message)]
        pub fn getSwapToken1EstimateGivenToken2(
            &self,
            _amountToken2: Balance,
        ) -> Result<Balance, Error> {
            self.activePool()?;
            if _amountToken2 >= self.totalToken2 {
                return Err(Error::InsufficientLiquidity);
            }

            let token2After = self.totalToken2 - _amountToken2;
            let token1After = self.getK() / token2After;
            let amountToken1 = (token1After - self.totalToken1) * 1000 / (1000 - self.fees);
            Ok(amountToken1)
        }

        /// Swaps given amount of Token1 to Token2 using algorithmic price determination
        /// Swap fails if Token2 amount is less than _minToken2
        #[ink(message)]
        pub fn swapToken1GivenToken1(
            &mut self,
            _amountToken1: Balance,
            _minToken2: Balance,
        ) -> Result<Balance, Error> {
            let caller = self.env().caller();
            self.validAmountCheck(&self.token1Balance, _amountToken1)?;

            let amountToken2 = self.getSwapToken1EstimateGivenToken1(_amountToken1)?;
            if amountToken2 < _minToken2 {
                return Err(Error::SlippageExceeded);
            }
            self.token1Balance
                .entry(caller)
                .and_modify(|val| *val -= _amountToken1);

            self.totalToken1 += _amountToken1;
            self.totalToken2 -= amountToken2;

            self.token2Balance
                .entry(caller)
                .and_modify(|val| *val += amountToken2);
            Ok(amountToken2)
        }

        /// Swaps given amount of Token1 to Token2 using algorithmic price determination
        /// Swap fails if amount of Token1 required to obtain _amountToken2 exceeds _maxToken1
        #[ink(message)]
        pub fn swapToken1GivenToken2(
            &mut self,
            _amountToken2: Balance,
            _maxToken1: Balance,
        ) -> Result<Balance, Error> {
            let caller = self.env().caller();
            let amountToken1 = self.getSwapToken1EstimateGivenToken2(_amountToken2)?;
            if amountToken1 > _maxToken1 {
                return Err(Error::SlippageExceeded);
            }
            self.validAmountCheck(&self.token1Balance, amountToken1)?;

            self.token1Balance
                .entry(caller)
                .and_modify(|val| *val -= amountToken1);

            self.totalToken1 += amountToken1;
            self.totalToken2 -= _amountToken2;

            self.token2Balance
                .entry(caller)
                .and_modify(|val| *val += _amountToken2);
            Ok(amountToken1)
        }

        /// Returns the amount of Token2 that the user will get when swapping a given amount of Token1 for Token2
        #[ink(message)]
        pub fn getSwapToken2EstimateGivenToken2(
            &self,
            _amountToken2: Balance,
        ) -> Result<Balance, Error> {
            self.activePool()?;
            let _amountToken2 = (1000 - self.fees) * _amountToken2 / 1000; // Adjusting the fees charged

            let token2After = self.totalToken2 + _amountToken2;
            let token1After = self.getK() / token2After;
            let mut amountToken1 = self.totalToken1 - token1After;

            // To ensure that Token1's pool is not completely depleted leading to inf:0 ratio
            if amountToken1 == self.totalToken1 {
                amountToken1 -= 1;
            }
            Ok(amountToken1)
        }

        /// Returns the amount of Token2 that the user should swap to get _amountToken1 in return
        #[ink(message)]
        pub fn getSwapToken2EstimateGivenToken1(
            &self,
            _amountToken1: Balance,
        ) -> Result<Balance, Error> {
            self.activePool()?;
            if _amountToken1 >= self.totalToken1 {
                return Err(Error::InsufficientLiquidity);
            }

            let token1After = self.totalToken1 - _amountToken1;
            let token2After = self.getK() / token1After;
            let amountToken2 = (token2After - self.totalToken2) * 1000 / (1000 - self.fees);
            Ok(amountToken2)
        }

        /// Swaps given amount of Token2 to Token1 using algorithmic price determination
        /// Swap fails if Token1 amount is less than _minToken1
        #[ink(message)]
        pub fn swapToken2GivenToken2(
            &mut self,
            _amountToken2: Balance,
            _minToken1: Balance,
        ) -> Result<Balance, Error> {
            let caller = self.env().caller();
            self.validAmountCheck(&self.token2Balance, _amountToken2)?;

            let amountToken1 = self.getSwapToken2EstimateGivenToken2(_amountToken2)?;
            if amountToken1 < _minToken1 {
                return Err(Error::SlippageExceeded);
            }
            self.token2Balance
                .entry(caller)
                .and_modify(|val| *val -= _amountToken2);

            self.totalToken2 += _amountToken2;
            self.totalToken1 -= amountToken1;

            self.token1Balance
                .entry(caller)
                .and_modify(|val| *val += amountToken1);
            Ok(amountToken1)
        }

        /// Swaps given amount of Token2 to Token1 using algorithmic price determination
        /// Swap fails if amount of Token2 required to obtain _amountToken1 exceeds _maxToken2
        #[ink(message)]
        pub fn swapToken2GivenToken1(
            &mut self,
            _amountToken1: Balance,
            _maxToken2: Balance,
        ) -> Result<Balance, Error> {
            let caller = self.env().caller();

            let amountToken2 = self.getSwapToken2EstimateGivenToken1(_amountToken1)?;
            if amountToken2 > _maxToken2 {
                return Err(Error::SlippageExceeded);
            }
            self.validAmountCheck(&self.token2Balance, amountToken2)?;

            self.token2Balance
                .entry(caller)
                .and_modify(|val| *val -= amountToken2);

            self.totalToken2 += amountToken2;
            self.totalToken1 -= _amountToken1;

            self.token1Balance
                .entry(caller)
                .and_modify(|val| *val += _amountToken1);
            Ok(amountToken2)
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;
        use ink_lang as ink;

        #[ink::test]
        fn new_works() {
            let contract = Amm::new(0);
            assert_eq!(contract.getMyHoldings(), (0, 0, 0));
            assert_eq!(contract.getPoolDetails(), (0, 0, 0, 0));
        }

        #[ink::test]
        fn faucet_works() {
            let mut contract = Amm::new(0);
            contract.faucet(100, 200);
            assert_eq!(contract.getMyHoldings(), (100, 200, 0));
        }

        #[ink::test]
        fn zero_liquidity_test() {
            let contract = Amm::new(0);
            let res = contract.getEquivalentToken1Estimate(5);
            assert_eq!(res, Err(Error::ZeroLiquidity));
        }

        #[ink::test]
        fn provide_works() {
            let mut contract = Amm::new(0);
            contract.faucet(100, 200);
            let share = contract.provide(10, 20).unwrap();
            assert_eq!(share, 100_000_000);
            assert_eq!(contract.getPoolDetails(), (10, 20, share, 0));
            assert_eq!(contract.getMyHoldings(), (90, 180, share));
        }

        #[ink::test]
        fn withdraw_works() {
            let mut contract = Amm::new(0);
            contract.faucet(100, 200);
            let share = contract.provide(10, 20).unwrap();
            assert_eq!(contract.withdraw(share / 5).unwrap(), (2, 4));
            assert_eq!(contract.getMyHoldings(), (92, 184, 4 * share / 5));
            assert_eq!(contract.getPoolDetails(), (8, 16, 4 * share / 5, 0));
        }

        #[ink::test]
        fn swap_works() {
            let mut contract = Amm::new(0);
            contract.faucet(100, 200);
            let share = contract.provide(50, 100).unwrap();
            let amountToken2 = contract.swapToken1GivenToken1(50, 50).unwrap();
            assert_eq!(amountToken2, 50);
            assert_eq!(contract.getMyHoldings(), (0, 150, share));
            assert_eq!(contract.getPoolDetails(), (100, 50, share, 0));
        }

        #[ink::test]
        fn slippage_works() {
            let mut contract = Amm::new(0);
            contract.faucet(100, 200);
            let share = contract.provide(50, 100).unwrap();
            let amountToken2 = contract.swapToken1GivenToken1(50, 51);
            assert_eq!(amountToken2, Err(Error::SlippageExceeded));
            assert_eq!(contract.getMyHoldings(), (50, 100, share));
            assert_eq!(contract.getPoolDetails(), (50, 100, share, 0));
        }

        #[ink::test]
        fn trading_fees_works() {
            let mut contract = Amm::new(100);
            contract.faucet(100, 200);
            contract.provide(50, 100).unwrap();
            let amountToken2 = contract.getSwapToken1EstimateGivenToken1(50).unwrap();
            assert_eq!(amountToken2, 48);
        }
    }
}
