import styles from "./Products.module.scss";
import ProductHeader from "./ProductHeader";
import ProductContent from "./ProductContent";
import ProductSide from "./ProductSide";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { AppError, Product, ProductAll } from "../../interfaces/interface";
import { useGlobalContext } from "../../store/GlobalContext";
import { useLocation } from "react-router-dom";
import { updateURLParams, retrieveQueryParams } from "../../utils/query";

export type queryType = {
  price: string;
  brand: string;
  sort: string;
  color: string;
};

const Products = () => {
  const [show, setShow] = useState("");
  const { handleSetNotification } = useGlobalContext();
  const { pathname } = useLocation();
  const queryKey = pathname.substring(1, pathname.length);
  const location = useLocation();
  const queryData = retrieveQueryParams(location.search);

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
      const data: ProductAll = await getData(
        `/product/type/${queryKey}?price=${price || queryData.price}&color=${
          color || queryData.color
        }&brands=${brand || queryData.brand}&sort=${sort || queryData.sort}`
      );
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
    refetch();
  }, [price, color, sort, brand]);

  useEffect(() => {
    setQuery({
      ...query,
      price: queryData?.price,
      sort: queryData?.sort,
      brand: queryData?.brand,
      color: queryData?.color,
    });
  }, []);

  return (
    <main
      className={
        show === "show" ? styles["state-products"] : styles["products"]
      }
    >
      <ProductSide
        show={show}
        setShow={setShow}
        query={query}
        setQuery={setQuery}
        brands={productData?.brands}
        color={productData?.color}
      />
      <section>
        <ProductHeader
          setShow={setShow}
          show={show}
          setQuery={setQuery}
          query={query}
        />
        <ProductContent productData={productData?.data} />
      </section>
    </main>
  );
};

export default Products;
