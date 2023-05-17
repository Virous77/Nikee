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
  isAdmin: boolean;
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

export interface Order {
  _id: string;
  amount: number;
  userId: string;
  paymentSuccess: boolean;
  address: {
    address: string;
    landmark: string;
    postalCode: string;
    state: string;
    city: string;
    addressType: string;
  };
  order: [{ name: string; image: string; price: number; quantity: number }];
  payment: {
    paymentId: string;
    orderId: string;
    signature: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  amount: number;
  discount: number;
  aboutProduct: string;
  brands: string;
  color: string;
  category: string;
  heroImage: string;
  images: string[];
  productInformation: string;
  productType: string;
  size: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  sale: boolean;
  featured: boolean;
}

export interface Fav {
  _id: string;
  userId: string;
  productId: string;
  productImage: string;
  createdAt: string;
  updatedAt: string;
  productName: string;
  productPrice: number;
  productType: string;
  productCategory: string;
}

export interface Review {
  _id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  userImage: string;
  rating: number;
  message: string;
}

export interface Cart {
  productImage: string;
  quantity: number;
  size: string;
  selectSize: string[];
  productId: string;
  productName: string;
  productCategory: string;
  productType: string;
  productColor: string;
  productPrice: number;
  userId: string;
  _id: string;
}

export interface Coupon {
  _id: string;
  coupon: string;
  validFrom: string;
  validTill: string;
  discountPercent: number;
  createdAt: string;
  updatedAt: string;
}
