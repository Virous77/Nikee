import React, { useState } from "react";
import styles from "./Sneakers.module.scss";

type SneakerSizeType = {
  size: string[] | undefined;
};

const SneakerSize: React.FC<SneakerSizeType> = ({ size }) => {
  const [sSize, setSSize] = useState("");
  return (
    <div className={styles["sneak-size-m"]}>
      <div className={styles["sneak-size-list"]}>
        {size?.map((item) => (
          <button
            className={
              sSize === item ? styles["active-size"] : styles["not-active"]
            }
            onClick={() => setSSize(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SneakerSize;
