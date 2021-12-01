# Introduction

In this tutorial, we will learn how to build an AMM having features - Provide, Withdraw & Swap with trading fees & slippage tolerance. Also, we will not deal with external tokens in the AMM instead, we will maintain our own mapping storing the balance of the accounts to keep things simple! We will build the smart contract in ink! (a rust based eDSL language) and the frontend of our application with the help of ReactJS.

# Prerequisites

* Should be familiar with Rust and ReactJS
* Have gone through [ink! beginners guide](https://docs.substrate.io/tutorials/v3/ink-workshop/pt1/)

# Requirements

* [Node.js](https://nodejs.org/en/download/releases/) v10.18.0+
* [Polkadot.js extension](https://polkadot.js.org/extension/) on your browser
* [Complete the ink! setup](https://paritytech.github.io/ink-docs/getting-started/setup)

# What's an AMM?

Automated Market Maker(AMM) is a type of decentralized exchange which is based on a mathematical formula of price assets. It allows digital assets to be traded without any permissions and automatically by using liquidity pools instead of any traditional buyers and sellers which uses an order book that was used in traditional exchange, here assets are priced according to a pricing algorithm. 

For example, Uniswap uses p * q = k, where p is the amount of one token in the liquidity pool, and q is the amount of the other. Here “k” is a fixed constant which means the pool’s total liquidity always has to remain the same. For further explanation let us take an example if an AMM has coin A and Coin B, two volatile assets, every time A is bought, the price of A goes up as there is less A in the pool than before the purchase. Conversely, the price of B goes down as there is more B in the pool. The pool stays in constant balance, where the total value of A in the pool will always equal the total value of B in the pool. The size will expand only when new liquidity providers join the pool.

# Implementing the smart contract

Move to the directory where you want to create your ink! project and run the following command in the terminal which will create a template ink! project for you.

```text
cargo contract new amm
```

Move inside the `amm` folder and replace the content of `lib.js` file with the following code. We have broke down the implementation into 10 parts.

```rust
#![cfg_attr(not(feature = "std"), no_std)]
#![allow(non_snake_case)]

use ink_lang as ink;

const PRECISION: u128 = 1_000_000; // Precision of 6 digits

#[ink::contract]
mod amm {
    use ink_storage::collections::HashMap;

    // Part 1. Define Error enum 

    // Part 2. Define storage struct 

    // Part 3. Helper functions 

    impl Amm {
        // Part 4. Constructor

        // Part 5. Faucet

        // Part 6. Read current state

        // Part 7. Provide

        // Part 8. Withdraw

        // Part 9. Swap
    }

    // Part 10. Unit Testing
}
```

## Part 1. Define Error enum
The `Error` enum will contain all the error values that our contract throws. Paste the following code:

```rust
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
```

Ink requires returned values to have certain traits. So we are deriving them for our custom enum type with the `#[derive(...)]` attribute.

## Part 2. Define storage struct

## Part 3. Helper functions

## Part 4. Constructor

## Part 5. Faucet

## Part 6. Read current state

## Part 7. Provide

## Part 8. Withdraw

## Part 9. Swap

## Part 10. Unit Testing

This completes the smart contract implementation part. Now we will deploy it on our local substrate node in the next section.

# Deploying the smart contract

# How to interact with polkadot.{js}

In this section we will see how to create an API instance, make a transaction and a query.

Install the required packages 

```text
npm install @polkadot/api @polkadot/api-contract @polkadot/extension-dapp
```

## Creating an API instance

To create a API instance refer the following code block

```javascript
// import
import { ApiPromise, WsProvider } from '@polkadot/api';

// creates a provider
const wsProvider = new WsProvider("ws://127.0.0.1:9944");

// new API instance
const api = await ApiPromise.create({ provider: wsProvider });
```

## Fetching the available account

Refer the below code to fetch all the account available.

```javascript
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
// returns an array of all the injected sources
const  extensions = await web3Enable('local canvas');

// returns an array of { address, meta: { name, source } }
// meta.source contains the name of the extension that provides this account
const allAccounts = await web3Accounts();

// select an account to interact with the contract
const selectedAccount = allAccounts[0];

// create a signer 
const accountSigner = await web3FromSource(activeAccount.meta.source).then((res) => res.signer);
```

## Interacting with the contract

Use the following interface to interact with your smart contract

```javascript
import { ContractPromise } from '@polkadot/api-contract';

// attach to an existing contract with a known ABI and address.
const contract = new ContractPromise(api, abi, address);
```

## Making a query

Now let's see how to make a query to our AMM contract. In the following code block we fetch the assets of a account by calling the method `getMyHoldings`.

```javascript
await contract.query
    .getMyHoldings(selectedAccount.address, { value: 0, gasLimit: -1 })
    .then((res) => {
      return res.output.toHuman();
    })
    .then((res) => {
      // do something
    });
```

## Making a Transaction

We will now fund the account with 100 KAR tokens and 150 KOTHI tokens, for this we will make a transaction using the method `faucet`.

```javascript
await contract.tx
    .faucet({ value: 0, gasLimit: -1 }, 100, 150)
    .signAndSend(
      selectedAccount.address,
      { signer: accountSigner },
      (res) => {
        if (res.status.isFinalized) {
          // do something
        }
      }
    );
```

# Creating a frontend in React

Now, we are going to create a react app and set up the front-end of the application. In the frontend, we represent token1 and token2 as KAR and KOTHI respectively.

Open a terminal and navigate to the directory where we will create the application.

```text
cd /path/to/directory
```

Now clone the github repository, move into the newly `polkadot-amm` directory and install all the dependencies.

```text
git clone https://github.com/realnimish/polkadot-amm.git
cd polkadot-amm
npm install
```

In our react application we keep all the React components in the `src/components` directory.

* **BoxTemplate** :- 
It renders the box containing the input field, its header, and the element on the right of the box, which can be a token name account balance, a button, or is empty.

* **FaucetComponent** :-
 Takes amount of token1 (KAR) and token2 (KOTHI) as input and funds the user address with that much amount.

* **ProvideComponent** :-
Takes amount of one token (KAR or KOTHI) fills in the estimated amount of the other token and helps provide liquidity to the pool.

* **SwapComponent** :- 
Helps swap a token to another. It takes the amount of token in input field *From* and estimates the amount of token in input field *To* and vise versa, and also helps set the slippage tolerance while swapping.

* **WithdrawComponent** :-
Helps withdraw the share one has. Also enables to withdraw to his maximum limit.

* **Account** :-
Shows the pool detail and the account details. It enables to switch between accounts in the application.

* **ContainerComponent** :- 
This component renders the main body of our application which contains the center box, the tabs to switch between the five components Swap, Provide, Faucet, Withdraw, Account.

The `App.js` renders the `ContainerComponent` and connects the application to `polkadot.{js}`. 

The `constants.js` file stores the contract **abi** and **CONTRACT_ADDRESS**. Don't forget to store your contract address and abi in those variables.

Now it's time to run our React app. Use the following command to start the React app.

```text
npm start
```

# Walkthrough

# About the Author(s)  

The tutorial was created by [Sayan Kar](https://github.com/SayanKar) and [Nimish Agrawal](https://github.com/realnimish). You can reach out to them on [Figment Forum](https://community.figment.io/u/nimishagrawal100.in/) for any query regarding the tutorial.

# References

- [How Uniswap works](https://docs.uniswap.org/protocol/V2/concepts/protocol-overview/how-uniswap-works)

