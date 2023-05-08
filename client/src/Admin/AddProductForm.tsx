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

      <fieldset>
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
      <MultipleImage image={image} setImage={setImage} />

      <ReactQuillText setValue={setValue} value={value} />
    </form>
  );
};

export default AddProductForm;
