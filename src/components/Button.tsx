import s from "./Button.module.css";

type ButtonPropsType = {
  className: boolean;
  onClickHandler: () => void;
  name: string;
};

export const Button = ({
  name,
  className,
  onClickHandler,
}: ButtonPropsType) => {
  return (
    <button
      className={className ? `${s.button} ${s.activeButton}` : s.button}
      onClick={onClickHandler}
    >
      {name}
    </button>
  );
};
