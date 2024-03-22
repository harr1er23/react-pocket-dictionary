import React from "react";

import styles from "./SmallTag.module.scss";

type SmallTagProps = {
    tagName: string;
}

const SmallTag: React.FC<SmallTagProps> = ({tagName}) => {
  return (
    <div className={styles.tagBackground}>
      {tagName}
    </div>
  );
};

export default SmallTag;