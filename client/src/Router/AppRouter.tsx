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
} from "../pages/index";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/sales" element={<SalePage />} />
        <Route path="/feature" element={<FeaturePage />} />
        <Route path="/sneakers" element={<SneakersPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/av" element={<FavPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
