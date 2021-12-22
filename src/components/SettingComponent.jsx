import { useState } from "react";
import "../styles.css";
import BoxTemplate from "./BoxTemplate";

export default function SettingComponent(props) {
  const [url, setUrl] = useState(props?.network?.url);
  const [address, setAddress] = useState(props?.network?.address);

  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  
  async function onClickChange() {
    if(url.length === 0 || address.length === 0)
        return;
    await props.connect(url, address);
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
