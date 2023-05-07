import styles from "./Admin.module.scss";
import AddProductForm from "./AddProductForm";
import { useState } from "react";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState("");
  const [productType, setProductType] = useState("Mens");
  const [productCategory, setProductCategory] = useState("");

  return (
    <section className={styles["add-product"]}>
      <AddProductForm
        value={productDetails}
        setValue={setProductDetails}
        setProductType={setProductType}
        productsType={productType}
        productCategory={productCategory}
        setProductCategory={setProductCategory}
      />
    </section>
  );
};

export default AddProduct;
