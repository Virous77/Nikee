import styles from "./Products.module.scss";
import ProductHeader from "./ProductHeader";
import ProductContent from "./ProductContent";
import ProductSide from "./ProductSide";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { AppError, Product } from "../../interfaces/interface";
import { useGlobalContext } from "../../store/GlobalContext";
import { useLocation } from "react-router-dom";
import { updateURLParams, retrieveQueryParams } from "../../utils/query";

const Products = () => {
  const [show, setShow] = useState("");
  const { handleSetNotification } = useGlobalContext();
  const { pathname } = useLocation();
  const queryKey = pathname.substring(1, pathname.length);
  const location = useLocation();
  const data = retrieveQueryParams(location.search);

  const initialState = {
    price: "",
    brand: "",
    sort: "",
    color: "",
  };
  const [query, setQuery] = useState(initialState);
  const { price, brand, sort, color } = query;

  const { data: productData, refetch } = useQuery(
    ["productAll"],
    async () => {
      const data: Product[] = await getData(`/product/type/${queryKey}`);
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

  useEffect(() => {
    updateURLParams({
      price,
      brand,
      sort,
      color,
      search: location.search,
    });
  }, [price, color, sort, brand]);

  useEffect(() => {
    setQuery({
      ...query,
      price: data?.price,
      sort: data?.sort,
      brand: data?.brand,
      color: data?.color,
    });
  }, []);

  return (
    <main
      className={
        show === "show" ? styles["state-products"] : styles["products"]
      }
    >
      <ProductSide show={show} setShow={setShow} />
      <section>
        <ProductHeader setShow={setShow} show={show} />
        <ProductContent productData={productData} />
      </section>
    </main>
  );
};

export default Products;
