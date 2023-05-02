import React, { createContext, useContext, useState } from "react";
import { CartState, AddressType, CartStateType } from "../types/type";
import { createData } from "../api/api";
import { useMutation } from "react-query";
import { getLocalData } from "../utils/data";
import { AppError } from "../interfaces/interface";
import { useGlobalContext } from "./GlobalContext";

const initialState: CartStateType = {
  cart: [],
  setCartContext: () => {},
  addressData: {} as AddressType,
  setAddressData: () => {},
  handleChange: () => {},
  handleAddressSubmit: () => {},
  isLoading: false,
};

const addressInitialState = {
  addressType: "",
  address: "",
  landmark: "",
  city: "",
  state: "",
  postalCode: "",
};

const CartContext = createContext<CartStateType>(initialState);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<CartState[]>([]);
  const [addressData, setAddressData] =
    useState<AddressType>(addressInitialState);
  const { handleSetNotification } = useGlobalContext();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: AddressType) => {
      return createData({ userData: data, endpoints: "/address" });
    },
    onError: ({ data }: AppError) => {
      if (!data) return;
      handleSetNotification({ message: data?.message, status: "error" });
    },
    onSuccess: () => {
      setAddressData(addressInitialState);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleAddressSubmit = () => {
    const id = getLocalData("nike");
    const data = {
      ...addressData,
      userId: id,
    };
    mutate(data);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCartContext: setCart,
        setAddressData,
        addressData,
        handleChange,
        handleAddressSubmit,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
