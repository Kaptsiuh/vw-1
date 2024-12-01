import { useEffect, useState } from "react";
import s from "./App.module.css";
import { Button } from "./components/Button";
import { Counter } from "./components/Counter";
import { Select } from "./components/Select";

export type StateType = {
  value: number;
  incValue: number;
  maxValue: number;
  isResetActive: boolean;
  isIncActive: boolean;
  setValueActive: boolean;
  areStartValuesValid: boolean;
  areMaxValuesValid: boolean;
};

const initState = () => {
  return {
    value: 0,
    incValue: 0,
    maxValue: 5,
    isResetActive: false,
    isIncActive: true,
    setValueActive: false,
    areStartValuesValid: true,
    areMaxValuesValid: true,
  };
};

export function App() {
  const [state, setState] = useState<StateType>(initState);

  const setToLocalStorage = (updatedState: StateType) => {
    setState(updatedState);
    localStorage.setItem("state", JSON.stringify(updatedState));
  };

  const getToLocalStorage = () => {
    const stateFromStorageString = localStorage.getItem("state");
    if (stateFromStorageString) {
      let stateFromStorage = JSON.parse(stateFromStorageString);
      setState(stateFromStorage);
    }
  };

  useEffect(() => {
    getToLocalStorage();
  }, []);

  const addValueHandler = () => {
    if (!state.setValueActive && state.incValue < state.maxValue) {
      const newValue = state.incValue + 1;
      setToLocalStorage({
        ...state,
        incValue: newValue,
        isIncActive: newValue < state.maxValue,
        isResetActive: true,
      });
    }
  };

  const resetValueHandler = () => {
    if (state.isResetActive) {
      setToLocalStorage({ ...state, incValue: state.value, isResetActive: false, isIncActive: true });
    }
  };

  const setMaxValueHandler = (value: number) => {
    const isValid = value > state.value && value >= 0;
    setState({
      ...state,
      maxValue: value,
      areMaxValuesValid: isValid,
      setValueActive: true,
      isResetActive: false,
      isIncActive: false,
    });
  };

  const setStartValueHandler = (value: number) => {
    const isValid = value < state.maxValue && value >= 0;
    setState({
      ...state,
      value,
      areStartValuesValid: isValid,
      setValueActive: true,
      isResetActive: false,
      isIncActive: false,
    });
  };

  const setNewValuesHandler = () => {
    if (state.areStartValuesValid && state.areMaxValuesValid && state.setValueActive) {
      setToLocalStorage({
        ...state,
        incValue: state.value,
        setValueActive: false,
        isResetActive: false,
        isIncActive: true,
      });
    }
  };

  return (
    <div className={s.App}>
      <div className={s.border}>
        <Select
          content={"start value:"}
          value={state.value}
          valid={state.areStartValuesValid}
          setValue={setStartValueHandler}
        />
        <Select
          content={"max value:"}
          value={state.maxValue}
          valid={state.areMaxValuesValid}
          setValue={setMaxValueHandler}
        />
        <div className={s.buttons}>
          <Button name={"set"} className={state.setValueActive} state={state} onClickHandler={setNewValuesHandler} />
        </div>
      </div>
      <div className={s.border}>
        <Counter state={state} value={state.incValue} />
        <div className={s.buttons}>
          <Button name={"inc"} className={state.isIncActive} state={state} onClickHandler={addValueHandler} />
          <Button name={"reset"} className={state.isResetActive} state={state} onClickHandler={resetValueHandler} />
        </div>
      </div>
    </div>
  );
}
