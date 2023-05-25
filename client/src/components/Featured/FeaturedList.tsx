import React from "react";
import { Product } from "../../interfaces/interface";
import styles from "./Featured.module.scss";
import { useNavigate } from "react-router-dom";

type FeaturedListType = {
  product: Product;
};

const FeaturedList: React.FC<FeaturedListType> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles["featured-sub"]}
      onClick={() => navigate(`/product/${product.slug}`)}
    >
      <img src={product.heroImage} alt={product.name} />

      <div className={styles["featured-details"]}>
        <div className={styles["featured-top"]}>
          <h2>{product.name}</h2>

          <div className={styles["featured-price"]}>
            <p
              className={
                product.discount > 0 ? styles["discount"] : styles["noDiscount"]
              }
            >
              ${product.amount}
            </p>
            {product.discount > 0 && (
              <span>
                ${product.amount - (product.discount / 100) * product.amount}
              </span>
            )}
          </div>
        </div>
        <p className={styles["featured-type"]}>
          {product.productType}'s {product.category}
        </p>
      </div>
    </div>
  );
};

export default FeaturedList;
