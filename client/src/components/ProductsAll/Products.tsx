import styles from "./Products.module.scss";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { AppError, ProductAll } from "../../interfaces/interface";
import { useGlobalContext } from "../../store/GlobalContext";
import { useLocation } from "react-router-dom";
import { updateURLParams, retrieveQueryParams } from "../../utils/query";
import ProductContent from "../../common/ProductContent";
import ProductHeader from "../../common/ProductHeader";
import ProductSide from "../../common/ProductSide";
import Loader from "../UI/Loader";

export type queryType = {
  price: string;
  brand: string;
  sort: string;
  color: string;
  type?: string;
};

type ProductsType = {
  title: string;
  endPoints: string;
  type?: string;
};

const Products: React.FC<ProductsType> = ({ title, endPoints, type }) => {
  const [show, setShow] = useState("");
  const { handleSetNotification } = useGlobalContext();
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

  const {
    data: productData,
    refetch,
    isLoading,
  } = useQuery(
    [title],
    async () => {
      const data: ProductAll = await getData(
        `${endPoints}price=${price || queryData.price}&color=${
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
  }, [price, color, sort, brand, type]);

  useEffect(() => {
    setQuery({
      ...query,
      price: queryData?.price,
      sort: queryData?.sort,
      brand: queryData?.brand,
      color: queryData?.color,
    });
  }, []);

  if (isLoading) return <Loader />;

  return (
    <main
      className={
        show === "show" ? styles["state-products"] : styles["products"]
      }
    >
      <section
        className={
          show === "fixed" ? `${styles["p-side"]}` : styles["p-side-hide"]
        }
      >
        <div className={styles["p-overlay"]} onClick={() => setShow("")} />
        <ProductSide
          show={show}
          setShow={setShow}
          query={query}
          setQuery={setQuery}
          brands={productData?.brands}
          color={productData?.color}
          productCount={productData?.data.length}
          title={title}
        />
      </section>

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
