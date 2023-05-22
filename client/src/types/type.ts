import { User, UserAddress } from "../interfaces/interface";
export type stateType = {
  name: string;
  email: string;
  about: string;
  password: string;
  birth: string;
  gender: string;
  country: string;
  image: string;
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
  UserData?: User;
  userEditData: User | undefined;
  setUserEditData: React.Dispatch<React.SetStateAction<User | undefined>>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateLoading: boolean;
  handleUserProfileUpdate: () => void;
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
  addressInitialState: AddressType;
  handleUpdateAddress: () => void;
  updateLoading: boolean;
  editAddress: string;
  setEditAddress: React.Dispatch<React.SetStateAction<string>>;
  allAddressData: UserAddress[] | undefined;
  refetch: () => void;
};

export type ProductDetailsType = {
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
  featured: boolean;
  sale: boolean;
};

export type AdminContextType = {
  productDetails: ProductDetailsType;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetailsType>>;
  handleCreatingData: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  sneakerLoading: boolean;
  setSneaker: React.Dispatch<React.SetStateAction<ProductDetailsType>>;
  sneaker: ProductDetailsType;
  handleChangeSneaker: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreatingSneaker: () => void;
};
