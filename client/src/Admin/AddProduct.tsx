import styles from "./Admin.module.scss";
import AddProductForm from "./AddProductForm";

const AddProduct = () => {
  return (
    <section className={styles["add-product"]}>
      <AddProductForm />
    </section>
  );
};

export default AddProduct;
