export type stateType = {
  name: string;
  email: string;
  about: string;
  password: string;
  birth: string;
  gender: string;
  country: string;
};

export type AuthContextType = {
  registerData: stateType;
  setRegisterData: React.Dispatch<React.SetStateAction<stateType>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegisterUser: () => void;
  isLoading: boolean;
  validate: boolean;
  setValidate: React.Dispatch<React.SetStateAction<boolean>>;
  stateInitialValue: stateType;
  loginLoading: boolean;
  handleLogin: () => void;
};

export type loginType = {
  email: string;
  password: string;
};

export type CartState = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  size: string;
};

export type AddressType = {
  addressType: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  landmark: string;
};

export type CartStateType = {
  cart: CartState[];
  setCartContext: React.Dispatch<React.SetStateAction<CartState[]>>;
  addressData: AddressType;
  setAddressData: React.Dispatch<React.SetStateAction<AddressType>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddressSubmit: () => void;
  isLoading: boolean;
};
