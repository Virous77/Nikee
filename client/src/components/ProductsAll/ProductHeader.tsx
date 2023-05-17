import styles from "./Products.module.scss";
import { BsFilterRight } from "react-icons/bs";
import { sortProduct } from "../../utils/data";
import React from "react";
import { queryType } from "./Products";

type ProductHeaderType = {
  setShow: React.Dispatch<React.SetStateAction<string>>;
  show: string;
  setQuery: React.Dispatch<React.SetStateAction<queryType>>;
  query: queryType;
};

const ProductHeader: React.FC<ProductHeaderType> = ({
  setShow,
  show,
  query,
  setQuery,
}) => {
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
          <select
            value={query.sort}
            onChange={(e) => setQuery({ ...query, sort: e.target.value })}
          >
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
