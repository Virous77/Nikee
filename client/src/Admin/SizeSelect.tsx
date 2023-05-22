import React from "react";
import Size from "../common/Size";
import { ProductDetailsType } from "../types/type";

type SelectType = {
  data: string[];
  productSize: string[];
  productDetails: ProductDetailsType;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetailsType>>;
};

const SizeSelect: React.FC<SelectType> = ({
  data,
  productSize,
  productDetails,
  setProductDetails,
}) => {
  const handleSelect = (size: string) => {
    if (productSize.includes(size)) {
      const filterData = productSize.filter((item) => item !== size);
      return setProductDetails({ ...productDetails, productSize: filterData });
    }
    setProductDetails({
      ...productDetails,
      productSize: [...productSize, size],
    });
  };

  return (
    <Size
      handleSelect={handleSelect}
      data={data}
      mainClass="size-select"
      active="active-select"
      productSize={productSize}
      padding="li-padding"
    />
  );
};

export default SizeSelect;
