import styles from "./Products.module.scss";
import { BsFilterRight } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { sortProduct } from "../../utils/data";
import React from "react";

type ProductHeaderType = {
  setShow: React.Dispatch<React.SetStateAction<string>>;
  show: string;
};

const ProductHeader: React.FC<ProductHeaderType> = ({ setShow, show }) => {
  return (
    <header className={styles["product-header"]}>
      <div className={styles["flat-header"]}>
        <button
          onClick={() => {
            if (show) {
              setShow("");
            } else {
              setShow("show");
            }
          }}
        >
          {show == "show" ? "Show" : "Hide"}{" "}
          <BsFilterRight size={22} cursor="pointer" />
        </button>

        <div>
          <select>
            {sortProduct.map((type) => (
              <option value={type.value} key={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
