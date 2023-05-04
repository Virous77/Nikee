export interface apiError {
  message: string;
  status: number;
  success: boolean;
  stack: string;
}

export interface AppError {
  data: apiError;
}

export interface User {
  _id: string;
  name: string;
  about: string;
  birth: string;
  country: string;
  email: string;
  gender: string;
  image: string;
  createdAt: string;
}

export interface UserAddress {
  _id: string;
  address: string;
  addressType: string;
  city: string;
  landmark: string;
  postalCode: string;
  state: string;
  userId: string;
  createdAt: string;
}
