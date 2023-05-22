import AddProductForm from "./AddProductForm";
import { useAdminContext } from "../store/AdminContext";
import styles from "./Admin.module.scss";

const Sneaker = () => {
  const {
    sneaker,
    setSneaker,
    sneakerLoading,
    handleChangeSneaker,
    handleCreatingSneaker,
  } = useAdminContext();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileReader = new FileReader();
    const file = e.target.files[0];

    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        if (!e.target.files) return;
        setSneaker({
          ...sneaker,
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
        productDetails={sneaker}
        setProductDetails={setSneaker}
        isLoading={sneakerLoading}
        handleChange={handleChangeSneaker}
        handleCreatingData={handleCreatingSneaker}
        title="Sneaker"
        handleImageUpload={handleImageUpload}
      />
    </section>
  );
};

export default Sneaker;
