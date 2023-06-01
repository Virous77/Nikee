import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Products from "./Products";
import AddProduct from "./AddProduct";
import Coupon from "./Coupon/Coupon";
import Sneaker from "./Sneaker";
import { useQuery } from "react-query";
import { getData } from "../api/api";
import { useGlobalContext } from "../store/GlobalContext";
import { AppError, Product } from "../interfaces/interface";

const AdminContent = () => {
  const { handleSetNotification } = useGlobalContext();

  const { data, isLoading } = useQuery(
    ["product-admin"],
    async () => {
      const data: Product[] = await getData(`/product/all/available`);
      return data;
    },
    {
      onError: (response: AppError) => {
        handleSetNotification({
          message: response.data.message,
          status: "error",
        });
      },
      retry: false,
    }
  );

  const { data: sneaker } = useQuery(
    ["sneaker-admin"],
    async () => {
      const data: Product[] = await getData(`/sneaker`);
      return data;
    },
    {
      onError: (response: AppError) => {
        handleSetNotification({
          message: response.data.message,
          status: "error",
        });
      },
      retry: false,
    }
  );

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <Dashboard product={data} isLoading={isLoading} sneaker={sneaker} />
        }
      />
      <Route path="/products" element={<Products />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/coupon" element={<Coupon />} />
      <Route path="/sneaker" element={<Sneaker />} />
    </Routes>
  );
};

export default AdminContent;
