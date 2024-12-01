import { ChangeEvent, useState } from "react";
import s from "./Select.module.css";

type SelectType = {
  content: string;
  value: number;
  setValue: (value: number) => void;
  valid: boolean;
};

export const Select = (props: SelectType) => {
  const [isFocused, setIsFocused] = useState(false);

  const setValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.setValue(+e.currentTarget.value);
  };

  return (
    <div className={s.selectWrapper}>
      <span className={s.span}>{props.content}</span>
      <input
        className={`${s.input} ${!props.valid && isFocused ? s.incorrectInput : ""}`}
        onFocus={() => setIsFocused(true)}
        // onBlur={() => setIsFocused(false)}
        type={"number"}
        value={props.value}
        onChange={setValueHandler}
      />
    </div>
  );
};
