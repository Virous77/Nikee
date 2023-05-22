import React, { createContext, useState, useContext } from "react";
import { useMutation } from "react-query";
import { createData } from "../api/api";
import { useGlobalContext } from "./GlobalContext";
import { AppError } from "../interfaces/interface";
import { ProductDetailsType, AdminContextType } from "../types/type";
import { productInitialState } from "./initialState";
import { getLocalData } from "../utils/data";

const initialState: AdminContextType = {
  productDetails: {} as ProductDetailsType,
  setProductDetails: () => {},
  handleCreatingData: () => {},
  handleChange: () => {},
  isLoading: false,
  sneakerLoading: false,
  setSneaker: () => {},
  sneaker: {} as ProductDetailsType,
  handleChangeSneaker: () => {},
  handleCreatingSneaker: () => {},
};

const AdminContext = createContext(initialState);

export const AdminContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [productDetails, setProductDetails] =
    useState<ProductDetailsType>(productInitialState);
  const [sneaker, setSneaker] =
    useState<ProductDetailsType>(productInitialState);

  const { handleSetNotification } = useGlobalContext();
  const userId = getLocalData("nike");

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

  ////Creating sneaker
  const { isLoading: sneakerLoading, mutate: mutateSneaker } = useMutation({
    mutationFn: (data: ProductDetailsType) => {
      return createData({ endpoints: "/sneaker", userData: data });
    },
    onSuccess: ({ message }: { message: string }) => {
      handleSetNotification({ status: "success", message });
      setSneaker(productInitialState);
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ status: "error", message: data.message });
    },
  });

  ////Actions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleChangeSneaker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSneaker({ ...sneaker, [name]: value });
  };

  const handleCreatingData = async () => {
    const data = {
      userId,
      ...productDetails,
    };
    mutate(data);
  };

  const handleCreatingSneaker = async () => {
    const data = {
      userId,
      ...sneaker,
    };
    mutateSneaker(data);
  };

  return (
    <AdminContext.Provider
      value={{
        productDetails,
        setProductDetails,
        handleCreatingData,
        handleChange,
        isLoading,
        sneakerLoading,
        setSneaker,
        sneaker,
        handleChangeSneaker,
        handleCreatingSneaker,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
export default AdminContext;
