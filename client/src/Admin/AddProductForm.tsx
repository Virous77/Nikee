import { ReactQuillText } from "./ReactQuillText";
import {
  productMensCategory,
  productWomenCategory,
  productType,
  size,
} from "../utils/NikeData";
import Select from "./Select";
import SizeSelect from "./SizeSelect";
import MultipleImage from "./MultipleImage";
import styles from "./Admin.module.scss";
import { FaCameraRetro } from "react-icons/fa";
import { useAdminContext } from "../store/AdminContext";

const AddProductForm = () => {
  const {
    productDetails,
    setProductDetails,
    handleChange,
    handleCreatingData,
    isLoading,
  } = useAdminContext();
  const {
    productCategory,
    productInformation,
    productsType,
    aboutProduct,
    image,
    name,
    amount,
    discount,
    color,
    brands,
  } = productDetails;

  const category =
    productsType === "Mens" || productsType === "Kids"
      ? productMensCategory
      : productWomenCategory;

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
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <input
          type="text"
          placeholder="Product Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </fieldset>

      <div className={styles["flat-add"]}>
        <fieldset>
          <input
            type="number"
            placeholder="Price"
            name="amount"
            value={amount}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <input
            type="number"
            placeholder="Discount Percent"
            name="discount"
            value={discount}
            onChange={handleChange}
          />
        </fieldset>
      </div>

      <div className={styles["flat-add"]}>
        <Select
          data={productType}
          value={productsType}
          setValue={(e) =>
            setProductDetails({
              ...productDetails,
              productsType: e.target.value,
            })
          }
        />

        <Select
          data={category}
          value={productCategory}
          setValue={(e) =>
            setProductDetails({
              ...productDetails,
              productCategory: e.target.value,
            })
          }
        />
      </div>

      <fieldset className={styles["size-set"]}>
        <p>Select {productCategory} Size</p>
        <SizeSelect
          data={size({
            name: productsType,
            Category: productCategory,
            products: productsType,
          })}
        />
      </fieldset>

      <div className={`${styles["size-set"]} ${styles["hero-image"]} `}>
        <p>Product Images</p>

        <div className={styles["hero-main"]}>
          {image ? (
            <img src={image} alt="images" />
          ) : (
            <fieldset>
              <label htmlFor="image">
                <FaCameraRetro />
                <p>Hero Image</p>
              </label>
              <input
                type="file"
                id="image"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </fieldset>
          )}
        </div>
      </div>

      <div className={styles["size-set"]}>
        <p>Product Images</p>
        <MultipleImage />
      </div>

      <div className={styles["size-set"]}>
        <p>About Product</p>
        <ReactQuillText
          setValue={(e) =>
            setProductDetails({ ...productDetails, aboutProduct: e })
          }
          value={aboutProduct}
        />
      </div>

      <div className={`${styles["size-set"]}  ${styles["info"]}`}>
        <p>Product Information</p>
        <ReactQuillText
          setValue={(e) =>
            setProductDetails({ ...productDetails, productInformation: e })
          }
          value={productInformation}
        />
      </div>

      <div className={styles["flat-add"]} style={{ marginTop: "2rem" }}>
        <fieldset>
          <input
            type="text"
            placeholder="Color"
            name="color"
            value={color}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <input
            type="text"
            placeholder="Brands"
            name="brands"
            value={brands}
            onChange={handleChange}
          />
        </fieldset>
      </div>

      <div className={styles["product-button"]}>
        <button disabled={isLoading} onClick={handleCreatingData}>
          {isLoading ? "Creating..." : "Add Product"}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
