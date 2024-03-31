import React from "react";
import { ClipLoader } from "react-spinners";

import styles from "./Input.module.scss";

type InputProps = {
  value?: string;
  onChangeFunction?: (value: string) => void;
  textPlaceholder?: string;
  type: string;
  ico?: any;
  readOnly?: boolean;
  onKeyDownFunction?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  inputName?: string;
  autofocus?: boolean;
  defaultValue?: string;
  content?: any;
  loading?: boolean;
};

const Input: React.FC<InputProps> = ({
  value,
  inputName,
  ico,
  onChangeFunction,
  textPlaceholder,
  type,
  readOnly,
  onKeyDownFunction,
  disabled = false,
  autofocus,
  defaultValue,
  content,
  loading,
}) => {
  console.log(loading);
  return (
    <div className={styles.inputBlock}>
      <input
        autoFocus={autofocus}
        value={value}
        onChange={(e) => onChangeFunction && onChangeFunction(e.target.value)}
        type={type}
        onKeyDown={onKeyDownFunction}
        className={styles.input}
        placeholder={textPlaceholder}
        style={{ pointerEvents: disabled ? "none" : "auto" }}
        name={inputName}
        readOnly={readOnly}
        defaultValue={defaultValue}
        {...content}
      />
      {loading && loading === true && <ClipLoader color="#fff" />}
      {ico && loading !== true && ico}
    </div>
  );
};

export default Input;
