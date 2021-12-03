import { useEffect, useState } from "react";
import Identicon from "@polkadot/react-identicon";
import "../styles.css";
import { MdLogout, MdSwapHoriz } from "react-icons/md";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";

export default function AccountComponent(props) {
  const [showTab, setShowTab] = useState(
    props.activeAccount ? "AccountDetail" : "SelectAccount"
  );
  const [accountList, setAccountList] = useState([]);

  const onChangeShowTab = async (val) => {
    setShowTab(val);
    if (val === "SelectAccount") {
      await fetchAccounts();
    }
  };

  const fetchAccounts = async () => {
    try {
      const extensions = await web3Enable("Local Canvas");
      if (extensions.length === 0) {
        return;
      }
      await web3Accounts().then((res) => setAccountList(res));
    } catch (err) {
      alert("Failed to fetch accounts");
      console.log("Extension setup failed", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const onLogout = () => {
    setShowTab("SelectAccount");
    props.setActiveAccount();
  };

  const changeActiveAccount = (val) => {
    props.setActiveAccount(val);
    setShowTab("AccountDetail");
  };

  const renderAccounts = () => {
    return accountList.map((val) => {
      return (
        <div
          className="accountWrapper"
          onClick={() => changeActiveAccount(val)}
        >
          <Identicon
            className="accounticon"
            value={val.address}
            size={32}
            theme={"polkadot"}
          />
          <div className="accountTextSection">
            <div className="accountDetailHeader">{val.meta.name}</div>
            <div className="accountDetailAddress">{val.address}</div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="tabBody">
      {showTab === "AccountDetail" && (
        <>
          <div className="tabHeader">Account</div>
          {props?.activeAccount?.address && (
            <>
              <div className="accountDetail">
                <div className="accountdetailIcon">
                  <div className="circle">
                    <Identicon
                      value={props.activeAccount.address}
                      size={32}
                      theme={"polkadot"}
                    />
                  </div>
                </div>
                <div className="accountDetailsText">
                  <div className="accountDetailHeader">
                    {props.activeAccount.meta.name}
                  </div>
                  <div className="accountDetailAddress">
                    {props.activeAccount.address}
                  </div>
                </div>
                <div
                  className="changeActiveAccountIcon"
                  onClick={() => onChangeShowTab("SelectAccount")}
                >
                  <MdSwapHoriz className="changeAccountIcon" />
                </div>
                <div className="logout" onClick={() => onLogout()}>
                  <MdLogout className="logoutIcon" />
                </div>
              </div>
              <div className="Assets">
                <div className="assetsHeading">Assets</div>
                <div className="assetBody">
                  <div className="row">
                    <div className="attributeName">Amount of KAR</div>
                    <div className="attributeValue">
                      {props.holding["amountOfKAR"]}
                    </div>
                  </div>
                  <div className="row">
                    <div className="attributeName">Amount of KOTHI</div>
                    <div className="attributeValue">
                      {props.holding["amountOfKOTHI"]}
                    </div>
                  </div>
                  <div className="row">
                    <div className="attributeName">Amount of Share</div>
                    <div className="attributeValue">
                      {props.holding["amountOfShare"]}
                    </div>
                  </div>
                </div>
              </div>
              <div className="Assets">
                <div className="assetsHeading">Pool Details</div>
                <div className="assetBody">
                  <div className="row">
                    <div className="attributeName">Total KAR</div>
                    <div className="attributeValue">
                      {props.holding["totalKAR"]}
                    </div>
                  </div>
                  <div className="row">
                    <div className="attributeName">Total KOTHI</div>
                    <div className="attributeValue">
                      {props.holding["totalKOTHI"]}
                    </div>
                  </div>
                  <div className="row">
                    <div className="attributeName">Total Share</div>
                    <div className="attributeValue">
                      {props.holding["totalShare"]}
                    </div>
                  </div>
                  <div className="row">
                    <div className="attributeName">Trading Fee</div>
                    <div className="attributeValue">
                      {props.holding["tradingFees"] + "%"}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {showTab === "SelectAccount" &&
        (props.contract === null ? (
          <div className="accountConnectBtn" onClick={() => props.connect()}>
            Connect your wallet
          </div>
        ) : (
          <>
            <div className="tabHeader">Select Account</div>
            <div className="miniText"> Select an account to work with</div>
            {accountList && renderAccounts()}
          </>
        ))}
    </div>
  );
}
