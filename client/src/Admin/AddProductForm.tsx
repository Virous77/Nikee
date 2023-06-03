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
import { BsCheck } from "react-icons/bs";
import React from "react";
import { ProductDetailsType } from "../types/type";

type AddProductFormType = {
  productDetails: ProductDetailsType;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreatingData: () => void;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetailsType>>;
  title: string;
};

const AddProductForm: React.FC<AddProductFormType> = ({
  productDetails,
  handleImageUpload,
  isLoading,
  handleChange,
  handleCreatingData,
  setProductDetails,
  title,
}) => {
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
    featured,
    sale,
  } = productDetails;

  const category =
    productsType === "men" || productsType === "kids"
      ? productMensCategory
      : productWomenCategory;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <input
          type="text"
          placeholder={`${title} Name`}
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

        {title === "Product" && (
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
        )}
      </div>

      <fieldset className={styles["size-set"]}>
        <p>Select {title === "Product" ? productCategory : "Sneaker"} Size</p>
        <SizeSelect
          data={size({
            name: productsType.toLowerCase(),
            Category: productCategory,
            products: productsType.toLocaleLowerCase(),
          })}
          setProductDetails={setProductDetails}
          productDetails={productDetails}
          productSize={productDetails.productSize}
        />
      </fieldset>

      <div className={`${styles["size-set"]} ${styles["hero-image"]} `}>
        <p>{title} Images</p>

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
        <p>{title} Images</p>
        <MultipleImage
          setProductDetails={setProductDetails}
          productDetails={productDetails}
        />
      </div>

      <div className={styles["size-set"]}>
        <p>About {title}</p>
        <ReactQuillText
          setValue={(e) =>
            setProductDetails({ ...productDetails, aboutProduct: e })
          }
          value={aboutProduct}
        />
      </div>

      <div className={`${styles["size-set"]}  ${styles["info"]}`}>
        <p>{title} Information</p>
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

      <div className={styles["flat-adds"]}>
        <div className={styles["prod-more"]}>
          <p
            onClick={() =>
              setProductDetails({ ...productDetails, featured: !featured })
            }
          >
            {featured && <BsCheck />}
          </p>
          <span>Featured</span>
        </div>

        <div className={styles["prod-more"]}>
          <p
            onClick={() =>
              setProductDetails({ ...productDetails, sale: !sale })
            }
          >
            {sale && <BsCheck />}
          </p>
          <span>Sale</span>
        </div>
      </div>

      <div className={styles["product-button"]}>
        <button disabled={isLoading} onClick={handleCreatingData}>
          {isLoading ? "Creating..." : `Add ${title}`}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
