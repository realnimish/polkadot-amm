import { useState } from "react";
import "../styles.css";
import BoxTemplate from "./BoxTemplate";
import { PRECISION } from "../constants";

export default function FaucetComponent(props) {
    const [amountOfKar, setAmountOfKar] = useState(0);
    const [amountOfKothi, setAmountOfKothi] = useState(0);

    const onChangeAmountOfKothi = (e) => {
        setAmountOfKothi(e.target.value);
    };

    const onChangeAmountOfKar = (e) => {
        setAmountOfKar(e.target.value);
    };
	
    // Funds the account with given amount of Tokens 
    async function onClickFund() {
        if (props.contract === null) {
            alert("Connect to Metamask");
            return;
        }
        if (["", "."].includes(amountOfKar) || ["", "."].includes(amountOfKothi)) {
            alert("Amount should be a valid number");
            return;
        }
        try {
            const GAS = 3000n * 1000000n;
            console.log("ACC", props.account)
            const injector = await props.web3FromSource(props.account.meta.source);
            let response = await props.contract.tx.faucet(
                {value:0,gasLimit:GAS},
                amountOfKar * PRECISION,
                amountOfKothi * PRECISION
            ).signAndSend(
                props.address,
                {signer: injector.signer},
                (result) => {
                    if (result.status.isInBlock) {
                        console.log('in a block');
                    } else if (result.status.isFinalized) {
                        console.log('finalized');
                    }
                }
            )
            console.log("YAAA")
            let res = await response.wait();
            console.log("res", res);
            setAmountOfKar(0);
            setAmountOfKothi(0);
            await props.getHoldings();
            alert("Success");
        } catch (err) {
            err?.data?.message && alert(err?.data?.message);
            console.log(err);
        }
    }

    return (
        <div className="tabBody">
            <BoxTemplate
                leftHeader={"Amount of KAR"}
                right={"KAR"}
                value={amountOfKar}
                onChange={(e) => onChangeAmountOfKar(e)}
            />
            <BoxTemplate
                leftHeader={"Amount of KOTHI"}
                right={"KOTHI"}
                value={amountOfKothi}
                onChange={(e) => onChangeAmountOfKothi(e)}
            />
            <div className="bottomDiv">
                <div className="btn" onClick={() => onClickFund()}>
                    Fund
                </div>
            </div>
        </div>
    );
}
