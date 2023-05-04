import React, { createContext, useContext, useState } from "react";
import { CartState, AddressType, CartStateType } from "../types/type";
import { createData, updateData, getData } from "../api/api";
import { useMutation, useQuery } from "react-query";
import { getLocalData } from "../utils/data";
import { AppError } from "../interfaces/interface";
import { useGlobalContext } from "./GlobalContext";
import { UserAddress } from "../interfaces/interface";

const addressInitialState = {
  addressType: "",
  address: "",
  landmark: "",
  city: "",
  state: "",
  postalCode: "",
};

const initialState: CartStateType = {
  cart: [],
  setCartContext: () => {},
  addressData: {} as AddressType,
  setAddressData: () => {},
  handleChange: () => {},
  handleAddressSubmit: () => {},
  isLoading: false,
  addressInitialState,
  handleUpdateAddress: () => {},
  updateLoading: false,
  setEditAddress: () => {},
  editAddress: false,
  allAddressData: {} as UserAddress[],
  refetch: () => {},
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
  const [editAddress, setEditAddress] = useState(false);

  const { handleSetNotification } = useGlobalContext();
  const user = getLocalData("nike");

  const { data: allAddressData, refetch } = useQuery(
    ["address"],
    (): Promise<UserAddress[]> => {
      if (user) {
        return getData(`/address/${user}`);
      }
      throw new Error("User not found");
    }
  );

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

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: (data: AddressType) => {
      const id: string = getLocalData("address");
      return updateData({
        userData: data,
        endpoints: `/address/${id}`,
      });
    },
    onError: ({ data }: AppError) => {
      if (!data) return;
      handleSetNotification({ message: data?.message, status: "error" });
    },
    onSuccess: ({ message }: { message: string }) => {
      setAddressData(addressInitialState);
      refetch();
      localStorage.removeItem("address");
      handleSetNotification({ message: message, status: "success" });
      setEditAddress(false);
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

  const handleUpdateAddress = () => {
    const id: string = getLocalData("nike");
    const data = {
      ...addressData,
      userId: id,
    };
    updateMutate(data);
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
        addressInitialState,
        handleUpdateAddress,
        updateLoading,
        editAddress,
        setEditAddress,
        refetch,
        allAddressData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
