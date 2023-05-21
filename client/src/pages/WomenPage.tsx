import Products from "../components/ProductsAll/Products";
import { useLocation } from "react-router-dom";

const WomenPage = () => {
  const { pathname } = useLocation();
  const queryKey = pathname.substring(1, pathname.length);

  return <Products title="Women" endPoints={`/product/type/${queryKey}?`} />;
};

export default WomenPage;
