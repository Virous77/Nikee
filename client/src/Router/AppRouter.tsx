import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  MenPage,
  WomenPage,
  KidsPage,
  SalePage,
  SneakersPage,
  FeaturePage,
  FavPage,
  CartPage,
  LoginPage,
  RegisterPage,
  ErrorPage,
  CheckoutPage,
} from "../pages/index";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/featured" element={<FeaturePage />} />
        <Route path="/sneakers" element={<SneakersPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/fav" element={<FavPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
