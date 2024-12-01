import { StateType } from "../App";
import s from "./Counter.module.css";

type CounterPropsType = {
  value: number;
  state: StateType;
};

export const Counter = ({ state, value }: CounterPropsType) => {
  const classNameStyles = () => {
    if (!state.areMaxValuesValid || !state.areStartValuesValid) {
      return `${s.value} ${s.setValues} ${s.valueDisable}`;
    } else if (state.setValueActive) {
      return `${s.value} ${s.setValues}`;
    } else if (state.isIncActive) {
      return s.value;
    } else {
      return `${s.value} ${s.valueDisable}`;
    }
  };

  return (
    <div className={classNameStyles()}>
      {state.setValueActive
        ? !state.areMaxValuesValid || !state.areStartValuesValid
          ? "Incorrect value!"
          : "Enter values and press 'set'"
        : value}
    </div>
  );
};
