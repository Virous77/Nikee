import React from "react";
import { Product } from "../../interfaces/interface";
import styles from "./Products.module.scss";

type ProductContentType = {
  productData: Product[] | undefined;
};

const ProductContent: React.FC<ProductContentType> = ({ productData }) => {
  return (
    <section className={styles["product-content"]}>
      <div>
        <div>
          {productData?.map((product) => (
            <div key={product._id}>
              <img src={product.heroImage} alt={product.name} />

              <div>
                <h3>{product.name}</h3>
                <p>
                  {product.productType}'s {product.category}
                </p>
                <p>1 Colour</p>

                <b>MPR: ${product.amount.toFixed(2)}</b>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductContent;
