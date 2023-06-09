import styles from "./Admin.module.scss";
import AddProductForm from "./AddProductForm";
import { useAdminContext } from "../store/AdminContext";

const AddProduct = () => {
  const {
    productDetails,
    setProductDetails,
    handleChange,
    handleCreatingData,
    isLoading,
  } = useAdminContext();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileReader = new FileReader();
    const file = e.target.files[0];

    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        if (!e.target.files) return;
        setProductDetails({
          ...productDetails,
          image: URL.createObjectURL(e.target.files[0]),
          imageR: fileReader.result,
        });
      }
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <section className={styles["add-product"]}>
      <AddProductForm
        productDetails={productDetails}
        handleImageUpload={handleImageUpload}
        setProductDetails={setProductDetails}
        isLoading={isLoading}
        handleChange={handleChange}
        handleCreatingData={handleCreatingData}
        title="Product"
      />
    </section>
  );
};

export default AddProduct;
