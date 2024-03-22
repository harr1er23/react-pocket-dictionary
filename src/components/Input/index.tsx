import React from "react";

import styles from "./Input.module.scss";

type InputProps = {
  value: string;
  onChangeFunction: (value: string) => void;
  textPlaceholder: string;
  type: string;
  onKeyDownFunction?: () => void;
  svgSrc?: any;
  onClickFunction?: () => void;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeFunction,
  textPlaceholder,
  type,
  onKeyDownFunction,
  svgSrc,
  onClickFunction,
  disabled=false
}) => {
  return (
    <div className={styles.inputBlock}>
      <input
        value={value}
        onChange={(e) => onChangeFunction(e.target.value)}
        type={type}
        onKeyDown={onKeyDownFunction}
        className={styles.input}
        placeholder={textPlaceholder}
        style={{pointerEvents: disabled ? 'none' : 'auto'}}
      />
      {svgSrc ? <div className={styles.soundImg}>{svgSrc}</div> : ''}
    </div>
  );
};

export default Input;
