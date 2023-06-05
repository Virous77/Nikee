import React, { useState } from "react";
import { ProductModalType } from "./ProductModal";
import { ProductDetailsType } from "../../types/type";
import AddProductForm from "../AddProductForm";
import style from "../Admin.module.scss";
import styles from "./Style.module.scss";
import { updateData } from "../../api/api";
import { useMutation } from "react-query";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError } from "../../interfaces/interface";
import { getLocalData } from "../../utils/data";

const EditModal: React.FC<ProductModalType> = ({
  productDetails,
  setProduct,
  refetch,
  title,
  endPoints,
}) => {
  const [editProductData, setEditProductData] = useState<ProductDetailsType>({
    name: productDetails?.name || "",
    aboutProduct: productDetails?.aboutProduct || "",
    productCategory: productDetails?.category || "",
    productInformation: productDetails?.productInformation || "",
    productSize: productDetails?.size || [],
    productsType: productDetails?.productType || "",
    images: productDetails?.images || [],
    image: productDetails?.heroImage || "",
    featured: productDetails?.featured || false,
    sale: productDetails?.sale || false,
    brands: productDetails?.brands || "",
    amount: productDetails?.amount || 0,
    discount: productDetails?.discount || 0,
    color: productDetails?.color || "",
    imageR: "",
    imagesR: productDetails?.images || [],
  });

  const { handleSetNotification } = useGlobalContext();
  const userId = getLocalData("nike");

  const { mutate: updateMutate, isLoading } = useMutation({
    mutationFn: (data: any) => {
      return updateData({
        endpoints: `/${endPoints}/${data.id}`,
        userData: data.updateData,
      });
    },
    onSuccess: ({ message }: { message: string }) => {
      handleSetNotification({ status: "success", message });
      refetch();
      setProduct(undefined);
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data?.message, status: "error" });
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileReader = new FileReader();
    const file = e.target.files[0];

    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        if (!e.target.files) return;
        setEditProductData({
          ...editProductData,
          image: URL.createObjectURL(e.target.files[0]),
          imageR: fileReader.result,
        });
      }
    };
    fileReader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditProductData({ ...editProductData, [name]: value });
  };

  const handleCreatingData = () => {
    const data = {
      userId,
      ...editProductData,
    };
    updateMutate({ id: productDetails?._id, updateData: data });
  };

  return (
    <section className={`${style["add-product"]} ${styles.editMain}`}>
      <AddProductForm
        productDetails={editProductData}
        handleImageUpload={handleImageUpload}
        setProductDetails={setEditProductData}
        isLoading={isLoading}
        handleChange={handleChange}
        handleCreatingData={handleCreatingData}
        title={title}
        isDelete="yes"
      />
    </section>
  );
};

export default EditModal;
