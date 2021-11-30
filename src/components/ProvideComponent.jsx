import { MdAdd } from "react-icons/md";
import { useState } from "react";
import "../styles.css";
import BoxTemplate from "./BoxTemplate";
import { PRECISION } from "../constants";

export default function ProvideComponent(props) {
  const [amountOfKar, setAmountOfKar] = useState(0);
  const [amountOfKothi, setAmountOfKothi] = useState(0);
  const [error, setError] = useState("");

  // Gets estimates of a token to be provided in the pool given the amount of other token
  const getProvideEstimate = async (token, value) => {
    if (["", "."].includes(value)) return;
    if (props.contract !== null && props?.activeAccount?.address) {
      try {
        if (token === "KAR") {
          await props.contract.query
            .getEquivalentToken2Estimate(
              props.activeAccount.address,
              { value: 0, gasLimit: -1 },
              value * PRECISION
            )
            .then((res) => (res = res.output.toHuman()))
            .then((res) => {
              console.log(res);
              if (res.Err) {
                if (res.Err.includes("ZeroLiquidity")) {
                  setError(
                    "Message: Empty pool. Set the initial conversion rate."
                  );
                } else {
                  alert(res.Err);
                  console.log(res.Err);
                }
              } else {
                setAmountOfKothi(res.Ok.replace(/,/g, "") / PRECISION);
              }
            });
        } else {
          await props.contract.query
            .getEquivalentToken1Estimate(
              props.activeAccount.address,
              { value: 0, gasLimit: -1 },
              value * PRECISION
            )
            .then((res) => (res = res.output.toHuman()))
            .then((res) => {
              if (res.Err) {
                if (res.Err.includes("ZeroLiquidity")) {
                  setError(
                    "Message: Empty pool. Set the initial conversion rate."
                  );
                } else {
                  alert(res.Err);
                  console.log(res.Err);
                }
              } else {
                setAmountOfKar(res.Ok.replace(/,/g, "") / PRECISION);
              }
            });
        }
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  };

  const onChangeAmountOfKar = (e) => {
    setAmountOfKar(e.target.value);
    getProvideEstimate("KAR", e.target.value);
  };

  const onChangeAmountOfKothi = (e) => {
    setAmountOfKothi(e.target.value);
    getProvideEstimate("KOTHI", e.target.value);
  };

  // Adds liquidity to the pool
  const provide = async () => {
    if (["", "."].includes(amountOfKar) || ["", "."].includes(amountOfKothi)) {
      alert("Amount should be a valid number");
      return;
    }
    if (props.contract === null || !props?.activeAccount?.address) {
      alert("Connect your wallet");
      return;
    } else {
      try {
        await props.contract.query
          .provide(
            props.activeAccount.address,
            { value: 0, gasLimit: -1 },
            amountOfKar * PRECISION,
            amountOfKothi * PRECISION
          )
          .then((res) => {
            if (res.result.toHuman().Err?.Module?.message)
              throw new Error(res.result.toHuman().Err.Module.message);
            else return res.output.toHuman();
          })
          .then(async (res) => {
            if (!res.Err) {
              try {
                await props.contract.tx
                  .provide(
                    { value: 0, gasLimit: -1 },
                    amountOfKar * PRECISION,
                    amountOfKothi * PRECISION
                  )
                  .signAndSend(
                    props.activeAccount.address,
                    { signer: props.signer },
                    async (res) => {
                      if (res.status.isFinalized) {
                        await props.getHoldings();
                        alert("Tx successful");
                        setError("");
                      }
                    }
                  );
                setAmountOfKar(0);
                setAmountOfKothi(0);
                alert("Tx submitted");
              } catch (err) {
                alert(err);
                console.log(err);
              }
            } else {
              console.log(res.Err);
              alert(res.Err);
            }
          });
      } catch (err) {
        alert(err);
        console.log("Couldn't provide :- ", err);
      }
    }
  };

  return (
    <div className="tabBody">
      <div className="tabHeader">Provide</div>
      <BoxTemplate
        leftHeader={"Amount of KAR"}
        value={amountOfKar}
        showBalance={true}
        balance={props.holding["amountOfKAR"]}
        onChange={(e) => onChangeAmountOfKar(e)}
      />
      <div className="alignCenter">
        <div className="tabIcon middleIcon" tabIndex={0}>
          <MdAdd className="plusIcon" />
        </div>
      </div>
      <BoxTemplate
        leftHeader={"Amount of KOTHI"}
        value={amountOfKothi}
        showBalance={true}
        balance={props.holding["amountOfKOTHI"]}
        onChange={(e) => onChangeAmountOfKothi(e)}
      />
      <div className="error">{error}</div>
      <div className="bottomDiv">
        <div className="btn" onClick={() => provide()}>
          Provide
        </div>
      </div>
    </div>
  );
}
