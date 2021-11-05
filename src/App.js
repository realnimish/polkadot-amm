import { useState } from "react";
import { abi, CONTRACT_ADDRESS } from "./constants";
import ContainerComponent from "./components/ContainerComponent";
import "./styles.css";

import {ApiPromise, WsProvider} from '@polkadot/api';
import {ContractPromise} from '@polkadot/api-contract';
import {web3Accounts, web3Enable, web3FromSource} from '@polkadot/extension-dapp';

export default function App() {
    const [myContract, setMyContract] = useState(null);
    const [address, setAddress] = useState();
    const [blockchainUrl, setBlockchainUrl] = useState('ws://127.0.0.1:9944');
    const [api, setApi] = useState(null);
    const [account,setAccount] = useState(null)

    async function connect() {
        console.log("HERE")
        const wsProvider = new WsProvider(blockchainUrl);
        const api = await ApiPromise.create({provider: wsProvider});
        setApi(api);
        await extensionSetup();

        const contract = new ContractPromise(api, abi, CONTRACT_ADDRESS);
        console.log("Contract",contract)
        setMyContract(contract);
    }

    const extensionSetup = async () => {
        const extensions = await web3Enable('Local Canvas');
        // console.log("DATA",extensions);
        if (extensions.length === 0) {
            return;
        }
        console.log("WEB3",(await web3Accounts())[0].address)
        setAccount((await web3Accounts())[0])
        setAddress((await web3Accounts())[0].address);
    };

    return (
        <div className="pageBody">
            <div className="navBar">
                <div className="appName"> AMM </div>
                {myContract === null ? (
                    <div className="connectBtn" onClick={() => connect()}>
                        {" "}
                        Connect to Metamask{" "}
                    </div>
                ) : (
                    <div className="connected"> {"Connected to " + address} </div>
                )}
            </div>
            <ContainerComponent contract={myContract} connect={() => connect()} />
        </div>
    );
}
