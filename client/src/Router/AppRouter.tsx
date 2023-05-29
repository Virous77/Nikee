import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage"));
const MenPage = lazy(() => import("../pages/MenPage"));
const WomenPage = lazy(() => import("../pages/WomenPage"));
const KidsPage = lazy(() => import("../pages/KidsPage"));
const SalePage = lazy(() => import("../pages/SalePage"));
const SneakersPage = lazy(() => import("../pages/SneakersPage"));
const FeaturePage = lazy(() => import("../pages/FeaturePage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const PaymentPage = lazy(() => import("../pages/PaymentPage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
const ProductDetailsPage = lazy(() => import("../pages/ProductDetailsPage"));
const PrivateRoutes = lazy(
  () => import("../components/PrivateRoutes/PrivateRoutes")
);
const PreventOnLogin = lazy(
  () => import("../components/PrivateRoutes/PrventonLogin")
);
const ProductCategory = lazy(() => import("../pages/ProductCategory"));
const SingleSneakerPage = lazy(() => import("../pages/SingleSneakerPage"));
const QueryPage = lazy(() => import("../pages/QueryPage"));

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/sale/:type" element={<SalePage />} />
        <Route path="/featured" element={<FeaturePage />} />
        <Route path="/sneakers" element={<SneakersPage />} />
        <Route path="/sneaker/:name" element={<SingleSneakerPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/product/:type/:category" element={<ProductCategory />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/query" element={<QueryPage />} />

        <Route
          path="/checkout"
          element={
            <PrivateRoutes>
              <CheckoutPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PreventOnLogin>
              <LoginPage />
            </PreventOnLogin>
          }
        />
        <Route
          path="/profile/*"
          element={
            <PrivateRoutes>
              <ProfilePage />
            </PrivateRoutes>
          }
        />

        <Route
          path="/admin/*"
          element={
            <PrivateRoutes>
              <AdminPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PreventOnLogin>
              <RegisterPage />
            </PreventOnLogin>
          }
        />
        <Route
          path="/payment-complete"
          element={
            <PrivateRoutes>
              <PaymentPage />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
