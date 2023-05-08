import React from "react";
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

export type Image = {
  image: string;
  images: string[];
};

type AddProductFormType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  productsType: string;
  setProductType: React.Dispatch<React.SetStateAction<string>>;
  setProductCategory: React.Dispatch<React.SetStateAction<string>>;
  productCategory: string;
  setProductSize: React.Dispatch<React.SetStateAction<string[]>>;
  productSize: string[];
  image: Image;
  setImage: React.Dispatch<React.SetStateAction<Image>>;
};

const AddProductForm: React.FC<AddProductFormType> = ({
  setValue,
  value,
  productsType,
  setProductType,
  setProductCategory,
  productCategory,
  productSize,
  setProductSize,
  image,
  setImage,
}) => {
  const category =
    productsType === "Mens" || productsType === "Kids"
      ? productMensCategory
      : productWomenCategory;

  console.log(image.image);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <input type="text" placeholder="Product Name" />
      </fieldset>

      <div className={styles["flat-add"]}>
        <fieldset>
          <input type="number" placeholder="Price" />
        </fieldset>

        <fieldset>
          <input type="number" placeholder="Discount Percent" />
        </fieldset>
      </div>

      <div className={styles["flat-add"]}>
        <Select
          data={productType}
          value={productsType}
          setValue={setProductType}
        />
        <Select
          data={category}
          value={productCategory}
          setValue={setProductCategory}
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
          value={productSize}
          setValue={setProductSize}
        />
      </fieldset>

      <div className={`${styles["size-set"]} ${styles["hero-image"]} `}>
        <p>Product Images</p>

        <div className={styles["hero-main"]}>
          {image.image ? (
            <img src={image.image} alt="images" />
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
                onChange={(e) => {
                  if (!e.target.files) return;
                  return setImage({
                    ...image,
                    image: URL.createObjectURL(e.target.files[0]),
                  });
                }}
              />
            </fieldset>
          )}
        </div>
      </div>

      <div className={styles["size-set"]}>
        <p>Product Images</p>
        <MultipleImage image={image} setImage={setImage} />
      </div>

      <div className={styles["size-set"]}>
        <p>About Product</p>
        <ReactQuillText setValue={setValue} value={value} />
      </div>

      <div className={styles["size-set"]} style={{ marginTop: "2rem" }}>
        <p>Product Information</p>
        <ReactQuillText setValue={setValue} value={value} />
      </div>

      <div className={styles["flat-add"]} style={{ marginTop: "2rem" }}>
        <fieldset>
          <input type="number" placeholder="Color" />
        </fieldset>

        <fieldset>
          <input type="number" placeholder="Brands" />
        </fieldset>
      </div>
    </form>
  );
};

export default AddProductForm;
