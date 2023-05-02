import React, { createContext, useContext, useState } from "react";
import { CartState, AddressType, CartStateType } from "../types/type";

const initialState: CartStateType = {
  cart: [],
  setCartContext: () => {},
  address: {} as AddressType,
  setAddress: () => {},
  handleChange: () => {},
  handleAddressSubmit: () => {},
};

const addressInitialState = {
  addressType: "",
  firstName: "",
  lastName: "",
  fullAddress: "",
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
  const [address, setAddress] = useState<AddressType>(addressInitialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleAddressSubmit = () => {
    console.log(address);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCartContext: setCart,
        setAddress,
        address,
        handleChange,
        handleAddressSubmit,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
