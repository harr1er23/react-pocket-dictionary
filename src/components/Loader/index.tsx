import React from "react";
import { ClipLoader } from "react-spinners";

import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <ClipLoader color="white" />
    </div>
  );
};

export default Loader;
