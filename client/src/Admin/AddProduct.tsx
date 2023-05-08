import styles from "./Admin.module.scss";
import AddProductForm from "./AddProductForm";
import { useState } from "react";

const AddProduct = () => {
  type Image = {
    image: string;
    images: string[];
  };

  const [productDetails, setProductDetails] = useState("");
  const [productType, setProductType] = useState("Mens");
  const [productCategory, setProductCategory] = useState("Shoes");
  const [productSize, setProductSize] = useState<string[]>([]);
  const [image, setImage] = useState<Image>({ image: "", images: [] });

  return (
    <section className={styles["add-product"]}>
      <AddProductForm
        value={productDetails}
        setValue={setProductDetails}
        setProductType={setProductType}
        productsType={productType}
        productCategory={productCategory}
        setProductCategory={setProductCategory}
        setProductSize={setProductSize}
        productSize={productSize}
        image={image}
        setImage={setImage}
      />
    </section>
  );
};

export default AddProduct;
