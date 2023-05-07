import React from "react";
import { ReactQuillText } from "./ReactQuillText";
import {
  productMensCategory,
  productWomenCategory,
  productType,
  shocksSize,
  shoesSizeMens,
  shoesSizeWomen,
  clothSizeMen,
  clothSizeWomen,
} from "../utils/NikeData";
import Select from "./Select";

type AddProductFormType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  productsType: string;
  setProductType: React.Dispatch<React.SetStateAction<string>>;
  setProductCategory: React.Dispatch<React.SetStateAction<string>>;
  productCategory: string;
};

const AddProductForm: React.FC<AddProductFormType> = ({
  setValue,
  value,
  productsType,
  setProductType,
  setProductCategory,
  productCategory,
}) => {
  const category =
    productsType === "Mens" || productsType === "Kids"
      ? productMensCategory
      : productWomenCategory;

  type sizeType = {
    products: string;
    Category: string;
    name: string;
  };
  const size = ({ Category, products, name }: sizeType) => {
    const returnValueShoes =
      products === "Mens" ? shoesSizeMens : shoesSizeWomen;
    const returnValueClothes =
      products === "Mens" ? clothSizeMen : clothSizeWomen;

    if (products === name && Category === "Shoes") return returnValueShoes;
    if (products === name && Category === "Socks") return shocksSize;
    if (products === name) {
      if (Category !== "Shoes" && Category !== "Socks")
        return returnValueClothes;
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <p
        onClick={() =>
          console.log(
            size({ products: "Mens", Category: "Shoes", name: "Mens" })
          )
        }
      >
        cool
      </p>
      <fieldset>
        <input type="text" placeholder="Product Name" />
      </fieldset>

      <div>
        <fieldset>
          <input type="number" placeholder="Price" />
        </fieldset>

        <fieldset>
          <input type="number" placeholder="Discount Percent" />
        </fieldset>
      </div>

      <div>
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

      <fieldset>{/* <Select /> */}</fieldset>

      <ReactQuillText setValue={setValue} value={value} />
    </form>
  );
};

export default AddProductForm;
