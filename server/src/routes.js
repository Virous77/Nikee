import UserRouter from "./Routes/userRoutes.js";
import PaymentRouter from "./Routes/PaymentRoutes.js";
import AddressRouter from "./Routes/AddressRoutes.js";
import ProductsRouter from "./Routes/ProductsRoutes.js";
import FavRouter from "./Routes/FavRoutes.js";
import ReviewRouter from "./Routes/ReviewRoutes.js";
import CartRouter from "./Routes/CartRoutes.js";
import CouponRouter from "./Routes/CouponRoutes.js";
import SneakerRouter from "./Routes/SneakersRoutes.js";
import SearchRouter from "./Routes/SearchRoutes.js";
import HomeRouter from "./Routes/HomeRoutes.js";

export const routes = [
  UserRouter,
  PaymentRouter,
  AddressRouter,
  ProductsRouter,
  FavRouter,
  ReviewRouter,
  CartRouter,
  CouponRouter,
  SearchRouter,
  SneakerRouter,
  HomeRouter,
];
