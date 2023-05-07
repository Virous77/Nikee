import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Products from "./Products";
import AddProduct from "./AddProduct";

const AdminContent = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  );
};

export default AdminContent;
