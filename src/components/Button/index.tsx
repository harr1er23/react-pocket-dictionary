import React from "react";

import styles from "./Button.module.scss";

type ButtonProps = {
  text: string;
  dismiss?: string;
  onClickFunction?: () => void;
  toggle?: string;
  target?: string;
  disabled?: boolean;
  ico?: any;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClickFunction,
  toggle,
  target,
  disabled,
  ico
}) => {
  return (
    <button
      onClick={onClickFunction && onClickFunction}
      data-bs-toggle={toggle}
      data-bs-target={target}
      className={styles.button}
      disabled={disabled}
    >
      {text}
      {ico && ico}
    </button>
  );
};

export default Button;
