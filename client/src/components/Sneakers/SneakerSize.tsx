import React from "react";
import styles from "./Sneakers.module.scss";

type SneakerSizeType = {
  size: string[] | undefined;
  sSize: string;
  setSSize: React.Dispatch<React.SetStateAction<string>>;
};

const SneakerSize: React.FC<SneakerSizeType> = ({ size, sSize, setSSize }) => {
  return (
    <div className={styles["sneak-size-m"]}>
      <div className={styles["sneak-size-list"]}>
        {size?.map((item) => (
          <button
            className={
              sSize === item ? styles["active-size"] : styles["not-active"]
            }
            key={item}
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
