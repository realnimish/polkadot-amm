import { useState } from "react";
import "../styles.css";
import BoxTemplate from "./BoxTemplate";
import { PRECISION } from "../constants.js";

export default function WithdrawComponent(props) {
    const [amountOfShare, setAmountOfShare] = useState(0);
    const [estimateTokens, setEstimateTokens] = useState([]);
    const onChangeAmountOfShare = async (e) => {
        setAmountOfShare(e.target.value);
        if (!["", "."].includes(e.target.value) && props.contract !== null) {
            try {
                let response = await props.contract.getWithdrawEstimate(
                    e.target.value * PRECISION
                );
                setEstimateTokens([
                    response.amountToken1 / PRECISION,
                    response.amountToken2 / PRECISION,
                ]);
            } catch (err) {
                alert(err?.data?.message);
            }
        }
    };

    // Gets the maximun share one can withdraw
    const getMaxShare = async () => {
        if (props.contract !== null) {
            setAmountOfShare(props.maxShare);
            let response = await props.contract.getWithdrawEstimate(
                props.maxShare * PRECISION
            );
            setEstimateTokens([
                response.amountToken1 / PRECISION,
                response.amountToken2 / PRECISION,
            ]);
        } else alert("Connect to Metamask");
    };

    // Withdraws the share
    const withdrawShare = async () => {
        if (["", "."].includes(amountOfShare)) {
            alert("Amount should be a valid number");
            return;
        }
        if (props.maxShare < amountOfShare) {
            alert("Amount should be less than your max share");
            return;
        }
        if (props.contract === null) {
            alert("Connect to Metamask");
            return;
        } else {
            try {
                let response = await props.contract.withdraw(amountOfShare * PRECISION);
                console.log(response);
                await response.wait();
                setAmountOfShare(0);
                setEstimateTokens([]);
                await props.getHoldings();
                alert("Success!");
            } catch (err) {
                alert(err?.data?.message);
            }
        }
    };
    return (
        <div className="tabBody">
            <BoxTemplate
                leftHeader={"Amount:"}
                right={
                    <div onClick={() => getMaxShare()} className="getMax">
                        Max
                    </div>
                }
                value={amountOfShare}
                onChange={(e) => onChangeAmountOfShare(e)}
            />
            {estimateTokens.length > 0 && (
                <div className="withdrawEstimate">
                    <div className="amount">Amount of Kar: {estimateTokens[0]}</div>
                    <div className="amount">Amount of Kothi: {estimateTokens[1]}</div>
                </div>
            )}
            <div className="bottomDiv">
                <div className="btn" onClick={() => withdrawShare()}>
                    Withdraw
                </div>
            </div>
        </div>
    );
}
