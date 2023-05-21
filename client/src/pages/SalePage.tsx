import Products from "../components/ProductsAll/Products";
import { useParams } from "react-router-dom";

const SalePage = () => {
  const { type } = useParams();

  return (
    <Products
      title="Sale"
      endPoints={`/product/type/${type}?sale=true&`}
      type={type}
    />
  );
};

export default SalePage;
