**Tutorial Link:** [Create an AMM on Polkadot using Ink!](tutorial.md)

**Description:** 

The tutorial will guide the developers to build an Automated Market Maker (AMM) dApp on a substrate-based chain with contract-pallet support. It will explain the internal working of an AMM and how to develop one using ink!, a Rust-based embedded Domain Specific Language (eDSL), and deploy it on a public testnet (Jupiter  A1 of Patract) using https://polkadot.js.org/apps. It will also illustrate how to integrate the smart contract with a react application using polkadot.js module and polkadot{.js} browser extension.

The AMM will have the following features: Provide, Withdraw and Swap. It will also support trading fees to incentivize liquidity providers to add liquidity and slippage tolerance to protect traders from market fluctuation. To keep things simple, The AMM doesn't implement routing and, hence it will deal with only two tokens at a time. The AMM will maintain its own internal mapping that stores the balance of accounts instead of dealing with the external tokens.
