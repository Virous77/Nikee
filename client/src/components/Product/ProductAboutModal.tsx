import styles from "./Product.module.scss";
import HtmlParser from "../../common/HtmlParser";
import { Product } from "../../interfaces/interface";
import React from "react";

type ProductAboutModalType = {
  data: Product | undefined;
};

const ProductAboutModal: React.FC<ProductAboutModalType> = ({ data }) => {
  return (
    <div className={styles["product-modal-m"]}>
      <div className={styles["product-d-m-w"]}>
        <img src={data?.heroImage} alt={data?.name} />

        <div>
          <h3>{data?.name}</h3>
          <p>MRP : ${data?.amount}</p>
        </div>
      </div>

      <div className={styles["product-content"]}>
        <HtmlParser data={data?.aboutProduct} />
      </div>
    </div>
  );
};

export default ProductAboutModal;
