import styles from "../components/ProductsAll/Products.module.scss";
import { BsFilterRight } from "react-icons/bs";
import { sortProduct } from "../utils/data";
import React from "react";
import { queryType } from "../components/ProductsAll/Products";
import { AiOutlineMenu } from "react-icons/ai";

type ProductHeaderType = {
  setShow: React.Dispatch<React.SetStateAction<string>>;
  show: string;
  setQuery: React.Dispatch<React.SetStateAction<queryType>>;
  query: queryType;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

const ProductHeader: React.FC<ProductHeaderType> = ({
  setShow,
  show,
  query,
  setQuery,
  setPageNumber,
}) => {
  return (
    <header className={styles["product-header"]}>
      <div className={styles["p-menu"]}>
        <AiOutlineMenu
          size={23}
          cursor="pointer"
          onClick={() => setShow("fixed")}
        />
      </div>

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
            onChange={(e) => {
              setQuery({ ...query, sort: e.target.value });
              setPageNumber(1);
            }}
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
