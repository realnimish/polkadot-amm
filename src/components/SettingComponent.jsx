import { useState } from "react";
import "../styles.css";
import BoxTemplate from "./BoxTemplate";

export default function SettingComponent(props) {
  const [url, setUrl] = useState(props.blockchainUrl);
  const [address, setAddress] = useState(props.contractAddress);

  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  
  async function onClickChange() {
    props.setInputBlockchainUrl(url);
    props.setInputContractAddress(address);

    if(!props?.activeAccount?.address){
        props.setActiveTab("Account");
    } else {
        setTimeout(async () => await props.connect(), 3000);
    }

  }

  return (
    <div className="tabBody">
      <div className="tabHeader">Settings</div>
      <BoxTemplate
        leftHeader={"Blockchain endpoint"}
        value={url}
        onChange={(e) => onChangeUrl(e)}
        leaveRegex={true}
      />
      <BoxTemplate
        leftHeader={"Contract Address"}
        value={address}
        onChange={(e) => onChangeAddress(e)}
        leaveRegex={true}
      />
      <div className="bottomDiv">
        <div className="btn" onClick={() => onClickChange()}>
          Change
        </div>
      </div>
    </div>
  );
}
