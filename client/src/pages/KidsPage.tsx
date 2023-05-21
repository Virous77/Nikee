import Products from "../components/ProductsAll/Products";
import { useLocation } from "react-router-dom";

const KidsPage = () => {
  const { pathname } = useLocation();
  const queryKey = pathname.substring(1, pathname.length);

  return <Products title="kid" endPoints={`/product/type/${queryKey}?`} />;
};

export default KidsPage;
