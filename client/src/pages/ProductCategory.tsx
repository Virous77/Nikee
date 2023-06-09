import { useLocation } from "react-router-dom";
import Products from "../components/ProductsAll/Products";

const ProductCategory = () => {
  const { pathname } = useLocation();
  const queryKey = pathname.substring(1, pathname.length).split("/");

  return <Products categoryTitle="Category" title={queryKey[1]} />;
};

export default ProductCategory;
