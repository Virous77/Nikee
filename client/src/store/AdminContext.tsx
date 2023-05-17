import React, { createContext, useState, useContext } from "react";
import { useMutation } from "react-query";
import { createData } from "../api/api";
import { useGlobalContext } from "./GlobalContext";
import { AppError } from "../interfaces/interface";
import { ProductDetailsType, AdminContextType } from "../types/type";

const initialState: AdminContextType = {
  productDetails: {} as ProductDetailsType,
  setProductDetails: () => {},
  handleCreatingData: () => {},
  handleChange: () => {},
  isLoading: false,
};

const productInitialState = {
  aboutProduct: "",
  productInformation: "",
  productsType: "Mens",
  productCategory: "Shoes",
  productSize: [],
  images: [],
  imagesR: [],
  image: "",
  imageR: "",
  name: "",
  amount: 0,
  discount: 0,
  color: "",
  brands: "",
  featured: false,
  sale: false,
};

const AdminContext = createContext(initialState);

export const AdminContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [productDetails, setProductDetails] =
    useState<ProductDetailsType>(productInitialState);

  const { handleSetNotification } = useGlobalContext();

  ////Creating new product
  const { isLoading, mutate } = useMutation({
    mutationFn: (data: ProductDetailsType) => {
      return createData({ endpoints: "/product", userData: data });
    },
    onSuccess: ({ message }: { message: string }) => {
      handleSetNotification({ status: "success", message });
      setProductDetails(productInitialState);
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ status: "error", message: data.message });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleCreatingData = async () => {
    mutate(productDetails);
  };

  return (
    <AdminContext.Provider
      value={{
        productDetails,
        setProductDetails,
        handleCreatingData,
        handleChange,
        isLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
export default AdminContext;
