import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Products from "./Products";
import AddProduct from "./AddProduct";
import Coupon from "./Coupon";
import Sneaker from "./Sneaker";

const AdminContent = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/coupon" element={<Coupon />} />
      <Route path="/sneaker" element={<Sneaker />} />
    </Routes>
  );
};

export default AdminContent;
