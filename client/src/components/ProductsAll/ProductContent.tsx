import styles from "./Products.module.scss";
import useProducts from "../../hooks/useProducts";

const ProductContent = () => {
  const { productData } = useProducts();
  return (
    <section className={styles["product-content"]}>
      <p>cool</p>
      {productData?.map((all, idx) => (
        <p key={idx}>{all._id}</p>
      ))}
    </section>
  );
};

export default ProductContent;
