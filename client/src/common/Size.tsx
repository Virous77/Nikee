import React from "react";
import styles from "./common.module.scss";

type SizeType = {
  data: string[] | undefined;
  handleSelect: (size: string) => void;
  productSize: string[] | undefined;
  active: string;
  mainClass: string;
  padding: string;
  title?: string;
};

const Size: React.FC<SizeType> = ({
  data,
  handleSelect,
  productSize,
  active,
  mainClass,
  padding,
  title,
}) => {
  return (
    <ul className={styles[mainClass]}>
      {data?.map((size, idx) => (
        <li
          key={idx}
          onClick={() => handleSelect(size)}
          className={`${styles[padding]}  ${
            productSize?.find((li) => li === size) ? styles[active] : ""
          }`}
        >
          {title === "product" && "US"} {size}
        </li>
      ))}
    </ul>
  );
};

export default Size;
