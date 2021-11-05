import { useState } from "react";
import { MdSwapVert } from "react-icons/md";
import "../styles.css";
import BoxTemplate from "./BoxTemplate";
import { PRECISION } from "../constants";

export default function SwapComponent(props) {
    const [coin, setCoin] = useState(["KAR", "KOTHI"]);
    const [amountFrom, setAmountFrom] = useState(0.0);
    const [amountTo, setAmountTo] = useState(0.0);

    const rev = () => {
        setCoin([...coin.reverse()]);
        getSwapEstimateAmountTo(amountFrom);
    };

    // Given amount of token in AmountFrom, estimates amount of token in amountTo, i.e. tokens recieved after swap
    const getSwapEstimateAmountTo = async (val) => {
        if (["", "."].includes(val)) return;
        if (props.contract !== null) {
            try {
                let estimateOfAmountTo;
                if (coin[0] === "KAR") {
                    estimateOfAmountTo = await props.contract.getSwapToken1Estimate(
                        val * PRECISION
                    );
                } else {
                    estimateOfAmountTo = await props.contract.getSwapToken2Estimate(
                        val * PRECISION
                    );
                }
                setAmountTo(estimateOfAmountTo / PRECISION);
            } catch (err) {
                alert(err?.data?.message);
            }
        }
    };

    // Given amount of tokens in amountTo, i.e. the amount recieved after swap, estimates the amount of tokens in amountFrom
    const getSwapEstimateAmountFrm = async (val) => {
        if (["", "."].includes(val)) return;
        if (props.contract !== null) {
            try {
                let estimateOfAmountFrm;
                if (coin[0] === "KAR") {
                    estimateOfAmountFrm =
                        await props.contract.getSwapToken1EstimateGivenToken2(
                            val * PRECISION
                        );
                } else {
                    estimateOfAmountFrm =
                        await props.contract.getSwapToken2EstimateGivenToken1(
                            val * PRECISION
                        );
                }
                setAmountFrom(estimateOfAmountFrm / PRECISION);
            } catch (err) {
                alert(err?.data?.message);
            }
        }
    };

    const onChangeAmtFrm = (val) => {
        setAmountFrom(val.target.value);
        getSwapEstimateAmountTo(val.target.value);
    };

    const onChangeAmtTo = (val) => {
        setAmountTo(val.target.value);
        getSwapEstimateAmountFrm(val.target.value);
    };

    // Helps swap a token to another.
    const onSwap = async () => {
        if (["", "."].includes(amountFrom)) {
            alert("Amount should be a valid number");
            return;
        }
        if (props.contract === null) {
            alert("Connect to Metamask");
            return;
        } else {
            try {
                let response;
                if (coin[0] === "KAR") {
                    response = await props.contract.swapToken1(amountFrom * PRECISION);
                } else {
                    response = await props.contract.swapToken2(amountFrom * PRECISION);
                }
                await response.wait();
                setAmountFrom(0);
                setAmountTo(0);
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
                leftHeader={"From"}
                right={coin[0]}
                value={amountFrom}
                onChange={(e) => onChangeAmtFrm(e)}
            />
            <div className="swapIcon" onClick={() => rev()}>
                <MdSwapVert />
            </div>
            <BoxTemplate
                leftHeader={"To"}
                right={coin[1]}
                value={amountTo}
                onChange={(e) => onChangeAmtTo(e)}
            />
            <div className="bottomDiv">
                <div className="btn" onClick={() => onSwap()}>
                    Swap
                </div>
            </div>
        </div>
    );
}
