import { useState } from "react";
import s from "./App.module.css";
import { Button } from "./components/Button";
import { Counter } from "./components/Counter";

const initState = () => {
  return {
    value: 0,
    isResetActive: false,
    isIncActive: true,
  };
};

export function App() {
  const maxValue = 5;

  const [state, setState] = useState(initState);

  const addValueHandler = () => {
    if (state.value < maxValue) {
      if (state.value === maxValue - 1) {
        setState((prev) => ({
          ...prev,
          value: prev.value + 1,
          isIncActive: false,
        }));
      } else {
        state.isResetActive
          ? setState((prev) => ({
              ...prev,
              value: prev.value + 1,
            }))
          : setState((prev) => ({
              ...prev,
              value: prev.value + 1,
              isResetActive: true,
            }));
      }
    }
  };

  const resetValueHandler = () => {
    if (state.isResetActive) {
      setState(initState);
    }
  };

  return (
    <div className={s.App}>
      <Counter className={state.isIncActive} value={state.value} />
      <div className={s.buttons}>
        <Button
          name={"inc"}
          className={state.isIncActive}
          onClickHandler={addValueHandler}
        />
        <Button
          name={"reset"}
          className={state.isResetActive}
          onClickHandler={resetValueHandler}
        />
      </div>
    </div>
  );
}

export default App;
