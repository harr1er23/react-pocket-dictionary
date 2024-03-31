import React from "react";

import styles from "./Button.module.scss";

type ButtonProps = {
  text: string;
  dismiss?: string;
  onClickFunction?: () => void;
  toggle?: string;
  target?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClickFunction,
  toggle,
  target,
  disabled,
}) => {
  return (
    <button
      onClick={() => (onClickFunction ? onClickFunction() : null)}
      data-bs-toggle={toggle}
      data-bs-target={target}
      className={styles.button}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
