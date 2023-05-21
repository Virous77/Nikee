import { useLocation } from "react-router-dom";
import Products from "../components/ProductsAll/Products";

const ProductCategory = () => {
  const { pathname } = useLocation();
  const queryKey = pathname.substring(1, pathname.length).split("/");

  return (
    <Products
      title={queryKey[1]}
      endPoints={`/product/type/${queryKey[1]}?category=${queryKey[2]}&`}
    />
  );
};

export default ProductCategory;
