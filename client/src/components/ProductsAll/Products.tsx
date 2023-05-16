import styles from "./Products.module.scss";
import ProductHeader from "./ProductHeader";
import ProductContent from "./ProductContent";
import ProductSide from "./ProductSide";
import { useState } from "react";

const Products = () => {
  const [show, setShow] = useState("");

  return (
    <main
      className={
        show === "show" ? styles["state-products"] : styles["products"]
      }
    >
      <ProductSide show={show} setShow={setShow} />
      <section>
        <ProductHeader setShow={setShow} show={show} />
        <ProductContent />
      </section>
    </main>
  );
};

export default Products;
