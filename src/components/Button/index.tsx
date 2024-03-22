import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  text: string;
  onClickFunction?: () => void;
  toggle: string;
  target?: string;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClickFunction,
  toggle,
  target,
}) => {
  return (
    <button
      onClick={() => (onClickFunction ? onClickFunction() : null)}
      data-bs-toggle={toggle}
      data-bs-target={target}
      className={styles.button}
    >
      {text}
    </button>
  );
};

export default Button;
