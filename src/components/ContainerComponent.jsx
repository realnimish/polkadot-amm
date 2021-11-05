import { useEffect, useState } from "react";
import "../styles.css";
import SwapComponent from "./SwapComponent";
import ProvideComponent from "./ProvideComponent";
import WithdrawComponent from "./WithdrawComponent";
import FaucetComponent from "./FaucetComponent";
import { PRECISION } from "../constants";

export default function ContainerComponent(props) {
    const [activeTab, setActiveTab] = useState("Swap");
    const [amountOfKAR, setAmountOfKAR] = useState(0);
    const [amountOfKOTHI, setAmountOfKOTHI] = useState(0);
    const [amountOfShare, setAmountOfShare] = useState(0);
    const [totalKAR, setTotalKAR] = useState(0);
    const [totalKOTHI, setTotalKOTHI] = useState(0);
    const [totalShare, setTotalShare] = useState(0);

    useEffect(() => {
        getHoldings();
    });

    // Fetch the pool details and personal assets details.
    async function getHoldings() {
        try {
            console.log("Fetching holdings123----");
            const GAS = 3000n * 1000000n;
            console.log("OUTTT",props.contract)
            console.log("XYZ",await props.contract.query)
            console.log("ADDRRRR", props.address)
            let res = await props.contract.query.getMyHoldings(props.address, {value:0,gasLimit:GAS});
            res = res.output
            setAmountOfKAR(res[0]/PRECISION)
            setAmountOfKOTHI(res[1]/PRECISION)
            setAmountOfShare(res[2]/PRECISION)

            res = await props.contract.query.getPoolDetails(props.address, {value:0,gasLimit:GAS});
            res = res.output
            console.log("RES",res[0]*1)
            setTotalKAR(res[0]/PRECISION)
            setTotalKOTHI(res[1]/PRECISION)
            setTotalShare(res[2]/PRECISION)
        } catch (err) {
            console.log("Couldn't Fetch holdings123", err);
        }
    }

    const changeTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="centerBody">
            <div className="centerContainer">
                <div className="selectTab">
                    <div
                        className={"tabStyle " + (activeTab === "Swap" ? "activeTab" : "")}
                        onClick={() => changeTab("Swap")}
                    >
                        Swap
                    </div>
                    <div
                        className={
                            "tabStyle " + (activeTab === "Provide" ? "activeTab" : "")
                        }
                        onClick={() => changeTab("Provide")}
                    >
                        Provide
                    </div>
                    <div
                        className={
                            "tabStyle " + (activeTab === "Withdraw" ? "activeTab" : "")
                        }
                        onClick={() => changeTab("Withdraw")}
                    >
                        Withdraw
                    </div>
                    <div
                        className={
                            "tabStyle " + (activeTab === "Faucet" ? "activeTab" : "")
                        }
                        onClick={() => changeTab("Faucet")}
                    >
                        Faucet
                    </div>
                </div>

                {activeTab === "Swap" && (
                    <SwapComponent
                        contract={props.contract}
                        getHoldings={() => getHoldings()}
                    />
                )}
                {activeTab === "Provide" && (
                    <ProvideComponent
                        contract={props.contract}
                        getHoldings={() => getHoldings()}
                    />
                )}
                {activeTab === "Withdraw" && (
                    <WithdrawComponent
                        contract={props.contract}
                        maxShare={amountOfShare}
                        getHoldings={() => getHoldings()}
                    />
                )}
                {activeTab === "Faucet" && (
                    <FaucetComponent
                        contract={props.contract}
                        getHoldings={() => getHoldings()}
                    />
                )}
            </div>
            <div className="details">
                <div className="detailsBody">
                    <div className="detailsHeader">Details</div>
                    <div className="detailsRow">
                        <div className="detailsAttribute">Amount of KAR:</div>
                        <div className="detailsValue">{amountOfKAR}</div>
                    </div>
                    <div className="detailsRow">
                        <div className="detailsAttribute">Amount of KOTHI:</div>
                        <div className="detailsValue">{amountOfKOTHI}</div>
                    </div>
                    <div className="detailsRow">
                        <div className="detailsAttribute">Your Share:</div>
                        <div className="detailsValue">{amountOfShare}</div>
                    </div>
                    <div className="detailsHeader">Pool Details</div>
                    <div className="detailsRow">
                        <div className="detailsAttribute">Total KAR:</div>
                        <div className="detailsValue">{totalKAR}</div>
                    </div>
                    <div className="detailsRow">
                        <div className="detailsAttribute">Total KOTHI:</div>
                        <div className="detailsValue">{totalKOTHI}</div>
                    </div>
                    <div className="detailsRow">
                        <div className="detailsAttribute">Total Shares:</div>
                        <div className="detailsValue">{totalShare}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}