import React from "react";
import { Product } from "../../interfaces/interface";
import styles from "./search.module.scss";

type SearchItemListType = {
  product: Product;
};

const SearchItemList: React.FC<SearchItemListType> = ({ product }) => {
  return (
    <div className={styles["result-sub"]}>
      <img src={product.heroImage} alt={product.name} />
      <div>
        <p>{product.name}</p>
        <span>
          {product.productType}'s {product.category}
        </span>
        <b>MRP: ${product.amount?.toFixed(2)}</b>
      </div>
    </div>
  );
};

export default SearchItemList;
