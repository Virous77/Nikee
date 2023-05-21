import React from "react";
import { Product } from "../interfaces/interface";
import styles from "../components/ProductsAll/Products.module.scss";
import { useNavigate } from "react-router-dom";

type ProductContentType = {
  productData: Product[] | undefined;
};

const ProductContent: React.FC<ProductContentType> = ({ productData }) => {
  const navigate = useNavigate();

  return (
    <section className={styles["product-content"]}>
      <div className={styles["prod-list"]}>
        {productData?.map((product) => (
          <div
            key={product._id}
            className={styles["prod-sub"]}
            onClick={() => navigate(`/product/${product.slug}`)}
          >
            <img src={product.heroImage} alt={product.name} />

            <div className={styles["prod-details"]}>
              <h3>{product.name}</h3>
              <p>
                {product.productType}'s {product.category}
              </p>
              <p style={{ margin: "4px" }}>1 Colour</p>

              <b>MPR: ${product.amount.toFixed(2)}</b>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductContent;
