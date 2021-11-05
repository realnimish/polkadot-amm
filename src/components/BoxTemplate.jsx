import "../styles.css";
import { RE } from "../constants";

export default function BoxTemplate(props) {
    const onInputChange = (e) => {
        if (e.target.value === "" || RE.test(e.target.value)) {
            props.onChange(e);
        }
    };
    return (
        <div className="boxTemplate">
            <div className="boxBody">
                <div>
                    <p className="leftHeader"> {props.leftHeader} </p>
                    <input
                        className="textField"
                        value={props.value}
                        onChange={(e) => onInputChange(e)}
                        placeholder={"Enter amount"}
                    />
                </div>
                <div className="rightContent">{props.right}</div>
            </div>
        </div>
    );
}
