import React from "react";
import styles from "./Admin.module.scss";

type SelectType = {
  data: string[];
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
};

const SizeSelect: React.FC<SelectType> = ({ data, value, setValue }) => {
  const handleSelect = (size: string) => {
    if (value.includes(size)) {
      const filterData = value.filter((item) => item !== size);
      return setValue(filterData);
    }
    setValue((old) => [...old, size]);
  };

  return (
    <ul className={styles["size-select"]}>
      {data.map((size, idx) => (
        <li
          key={idx}
          onClick={() => handleSelect(size)}
          className={
            value.find((li) => li === size) ? styles["active-select"] : ""
          }
        >
          {size}
        </li>
      ))}
    </ul>
  );
};

export default SizeSelect;
