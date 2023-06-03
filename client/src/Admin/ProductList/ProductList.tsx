import React from "react";
import { Product } from "../../interfaces/interface";
import styles from "./Style.module.scss";
import { TbEdit } from "react-icons/tb";
import { CgDetailsMore } from "react-icons/cg";

type ProductListType = {
  product: Product | undefined;
  setProductDetails: React.Dispatch<React.SetStateAction<Product | undefined>>;
};

const ProductList: React.FC<ProductListType> = ({
  product,
  setProductDetails,
}) => {
  return (
    <li>
      <img src={product?.heroImage} alt={product?.name} />
      <div>
        <h2>{product?.name}</h2>
        <p>
          {product?.productType} {product?.category}
        </p>
        <p>{product?.brands}</p>
      </div>

      <div className={styles["action"]}>
        <span>
          <TbEdit size={21} />
        </span>

        <span>
          <CgDetailsMore size={21} onClick={() => setProductDetails(product)} />
        </span>
      </div>
    </li>
  );
};

export default ProductList;
