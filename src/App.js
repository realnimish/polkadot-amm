import { useEffect, useState } from "react";
import { abi, CONTRACT_ADDRESS, blockchainUrl } from "./constants";
import ContainerComponent from "./components/ContainerComponent";
import "./styles.css";
import { RiWallet3Fill } from "react-icons/ri";
import { GiBodySwapping } from "react-icons/gi";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { web3FromSource } from "@polkadot/extension-dapp";
import Identicon from "@polkadot/react-identicon";

export default function App() {
  const [myContract, setMyContract] = useState(null);
  const [activeAccount, setActiveAccount] = useState();
  const [signer, setSigner] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Swap");

  useEffect(() => {
    (async () => {
      activeAccount &&
        setSigner(
          await web3FromSource(activeAccount.meta.source).then(
            (res) => res.signer
          )
        );
    })();
  }, [activeAccount]);

  async function connect() {
    try {
      console.log("----- Connect called -----");
      const wsProvider = new WsProvider(blockchainUrl);
      const api = await ApiPromise.create({ provider: wsProvider });
      const contract = new ContractPromise(api, abi, CONTRACT_ADDRESS);
      setMyContract(contract);
      setSelectedTab("Account");
    } catch (err) {
      console.log("Couldn't connect to wallet :- ", err);
    }
  }

  return (
    <div className="pageBody">
      <div className="navBar">
        <div className="appName">
          {" "}
          AMM <GiBodySwapping className="appnameIcon" />
        </div>
        {myContract === null || activeAccount == null ? (
          <div className="connectBtn" onClick={() => connect()}>
            <RiWallet3Fill className="accountIcon" />
            <div className="connectWalletText">Connect your wallet</div>
          </div>
        ) : (
          <div className="connected">
            <Identicon
              value={activeAccount.address}
              size={32}
              theme={"polkadot"}
            />
            <div className="connectedAccountName">
              {activeAccount.meta.name}
            </div>
          </div>
        )}
      </div>
      <ContainerComponent
        contract={myContract}
        selectedTab={selectedTab}
        connect={() => connect()}
        activeAccount={activeAccount}
        signer={signer}
        setActiveAccount={(val) => setActiveAccount(val)}
        setActiveTab={(val) => setSelectedTab(val)}
      />
    </div>
  );
}
