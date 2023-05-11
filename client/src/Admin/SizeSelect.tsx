import React from "react";
import { useAdminContext } from "../store/AdminContext";
import Size from "../common/Size";

type SelectType = {
  data: string[];
};

const SizeSelect: React.FC<SelectType> = ({ data }) => {
  const { productDetails, setProductDetails } = useAdminContext();
  const { productSize } = productDetails;

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
