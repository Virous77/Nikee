import React from "react";
import styles from "./Admin.module.scss";
import { useAdminContext } from "../store/AdminContext";

type SelectType = {
  data: string[];
};

const SizeSelect: React.FC<SelectType> = ({ data }) => {
  const { productDetails, setProductDetails } = useAdminContext();
  const { productSize } = productDetails;

  const handleSelect = (size: string) => {
    if (productSize.includes(size)) {
      const filterData = productSize.filter((item) => item !== size);
      return setProductDetails({ ...productDetails, productSize: filterData });
    }
    setProductDetails({
      ...productDetails,
      productSize: [...productSize, size],
    });
  };

  return (
    <ul className={styles["size-select"]}>
      {data.map((size, idx) => (
        <li
          key={idx}
          onClick={() => handleSelect(size)}
          className={
            productSize.find((li) => li === size) ? styles["active-select"] : ""
          }
        >
          {size}
        </li>
      ))}
    </ul>
  );
};

export default SizeSelect;
