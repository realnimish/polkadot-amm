import { useState } from "react";
import "../styles.css";
import BoxTemplate from "./BoxTemplate";
import { PRECISION } from "../constants.js";

export default function WithdrawComponent(props) {
  const [amountOfShare, setAmountOfShare] = useState(0);
  const [estimateTokens, setEstimateTokens] = useState([]);
  const onChangeAmountOfShare = async (e) => {
    setAmountOfShare(e.target.value);
    if (
      !["", "."].includes(e.target.value) &&
      props.contract !== null &&
      props?.activeAccount?.address
    ) {
      try {
        await props.contract.query
          .getWithdrawEstimate(
            props.activeAccount.address,
            { value: 0, gasLimit: -1 },
            e.target.value * PRECISION
          )
          .then((res) => res.output.toHuman())
          .then((res) => {
            if (!res.Err) {
              setEstimateTokens([
                res.Ok[0].replace(/,/g, "") / PRECISION,
                res.Ok[1].replace(/,/g, "") / PRECISION,
              ]);
            } else {
              console.log(res.Err);
              alert(res.Err);
            }
          });
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
  };

  // Gets the maximun share one can withdraw
  const getMaxShare = async () => {
    if (props.contract !== null && props?.activeAccount?.address) {
      setAmountOfShare(props.maxShare);
      await props.contract.query
        .getWithdrawEstimate(
          props.activeAccount.address,
          { value: 0, gasLimit: -1 },
          props.maxShare * PRECISION
        )
        .then((res) => res.output.toHuman())
        .then((res) => {
          if (!res.Err) {
            setEstimateTokens([
              res.Ok[0].replace(/,/g, "") / PRECISION,
              res.Ok[1].replace(/,/g, "") / PRECISION,
            ]);
          } else {
            console.log(res.Err);
            alert(res.Err);
          }
        });
    } else alert("Connect your wallet");
  };

  // Withdraws the share
  const withdrawShare = async () => {
    if (["", "."].includes(amountOfShare)) {
      alert("Amount should be a valid number");
      return;
    }
    if (props.contract === null || !props?.activeAccount?.address) {
      alert("Connect your wallet");
      return;
    } else {
      if (props.maxShare < amountOfShare) {
        alert("Amount should be less than your max share");
        return;
      }
      try {
        await props.contract.query
          .withdraw(
            props.activeAccount.address,
            { value: 0, gasLimit: -1 },
            amountOfShare * PRECISION
          )
          .then((res) => {
            if (res.result.toHuman().Err?.Module?.message)
              throw new Error(res.result.toHuman().Err.Module.message);
            else return res.output.toHuman();
          })
          .then(async (res) => {
            if (!res.Err) {
              await props.contract.tx
                .withdraw({ value: 0, gasLimit: -1 }, amountOfShare * PRECISION)
                .signAndSend(
                  props.activeAccount.address,
                  { signer: props.signer },
                  async (res) => {
                    if (res.status.isFinalized) {
                      await props.getHoldings();
                      setAmountOfShare(0);
                      setEstimateTokens([]);
                      alert("Tx successful");
                    }
                  }
                );
              alert("Tx submitted");
            } else {
              console.log(res.Err);
              alert(res.Err);
            }
          });
      } catch (err) {
        alert(err);
        console.log("Couldn't withdraw :- ", err);
      }
    }
  };
  return (
    <div className="tabBody">
      <div className="tabHeader">Withdraw</div>
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
