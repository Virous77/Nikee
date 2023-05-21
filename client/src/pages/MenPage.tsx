import Products from "../components/ProductsAll/Products";
import { useLocation } from "react-router-dom";

const MenPage = () => {
  const { pathname } = useLocation();
  const queryKey = pathname.substring(1, pathname.length);

  return <Products title="Men" endPoints={`/product/type/${queryKey}?`} />;
};

export default MenPage;
