import React, { createContext, useState, useContext } from "react";
import { useMutation } from "react-query";
import { createData } from "../api/api";
import { useGlobalContext } from "./GlobalContext";
import { AppError } from "../interfaces/interface";

type ProductDetailsType = {
  aboutProduct: string;
  productInformation: string;
  productsType: string;
  productCategory: string;
  productSize: string[];
  images: string[];
  image: string;
  name: string;
  amount: number;
  discount: number;
  color: string;
  brands: string;
  imagesR: string[] | [];
  imageR: string | undefined;
};

type AdminContextType = {
  productDetails: ProductDetailsType;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetailsType>>;
  handleCreatingData: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
};

const initialState: AdminContextType = {
  productDetails: {} as ProductDetailsType,
  setProductDetails: () => {},
  handleCreatingData: () => {},
  handleChange: () => {},
  isLoading: false,
};

const AdminContext = createContext(initialState);

export const AdminContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [productDetails, setProductDetails] = useState<ProductDetailsType>({
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
  });

  const { handleSetNotification } = useGlobalContext();

  const { isLoading, mutate } = useMutation({
    mutationFn: (data: ProductDetailsType) => {
      return createData({ endpoints: "/product", userData: data });
    },
    onSuccess: ({ message }: { message: string }) => {
      handleSetNotification({ status: "success", message });
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
    console.log(productDetails);
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
