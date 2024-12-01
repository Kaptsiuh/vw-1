import { StateType } from "../App";
import s from "./Button.module.css";

type ButtonPropsType = {
  className: boolean;
  onClickHandler: () => void;
  name: string;
  state: StateType;
};

export const Button = ({ name, className, onClickHandler, state }: ButtonPropsType) => {
  const classNameStyles = () => {
    if ((name === "set" && !state.areMaxValuesValid) || !state.areStartValuesValid) {
      return s.button;
    }
    if (className) {
      return `${s.button} ${s.activeButton}`;
    } else {
      return s.button;
    }
  };

  return (
    <button className={classNameStyles()} onClick={onClickHandler}>
      {name}
    </button>
  );
};
