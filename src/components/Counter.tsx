import s from "./Counter.module.css";

type CounterPropsType = {
  className: boolean;
  value: number;
};

export const Counter = ({ className, value }: CounterPropsType) => {
  return (
    <div className={className ? s.value : `${s.value} ${s.valueDisable}`}>
      {value}
    </div>
  );
};
