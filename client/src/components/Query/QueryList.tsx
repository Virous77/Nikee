import React from "react";
import { Product } from "../../interfaces/interface";
import styles from "./Query.module.scss";
import { useNavigate } from "react-router-dom";

type QueryListType = {
  product: Product;
};

const QueryList: React.FC<QueryListType> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles["query-sub"]}
      onClick={() => navigate(`/product/${product.slug}`)}
    >
      <img src={product.heroImage} alt={product.name} />
      <div className={styles["query-d"]}>
        <h3>{product.name}</h3>
        <p>${product.amount}</p>
      </div>
    </div>
  );
};

export default QueryList;
