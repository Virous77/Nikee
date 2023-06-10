import styles from "./Products.module.scss";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { AppError, ProductAll, Product } from "../../interfaces/interface";
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
  type?: string;
  saleQuery?: string;
  categoryQuery?: string;
  categoryTitle?: string;
};

const Products: React.FC<ProductsType> = ({
  title,
  type,
  saleQuery,
  categoryTitle,
}) => {
  const { pathname } = useLocation();
  const queryKey = pathname.substring(1, pathname.length);

  const [show, setShow] = useState("");
  const [state, setState] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
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

  const saleSplit = queryKey.split("/");

  const queryParams = `price=${price || queryData.price}&color=${
    color || queryData.color
  }&brands=${brand || queryData.brand}&sort=${sort || queryData.sort} `;

  const QSaleQuery =
    title === "Sale" &&
    `/product/type/${
      title === "Sale" ? saleSplit[1] : queryKey
    }/${pageNumber}/${pageSize}${saleQuery}${queryParams} `;

  const QCategoryQuery =
    categoryTitle === "Category" &&
    `/product/type/${saleSplit[1]}/${pageNumber}/${pageSize}?category=${saleSplit[2]}&${queryParams}`;

  const QPeopleQuery =
    title !== "Category" &&
    title !== "Sale" &&
    `/product/type/${queryKey}/${pageNumber}/${pageSize}?${queryParams}`;

  const mainQuery =
    title === "Sale"
      ? QSaleQuery
      : categoryTitle === "Category"
      ? QCategoryQuery
      : QPeopleQuery;

  const {
    data: productData,
    refetch,
    isLoading,
    isFetching,
  } = useQuery(
    [title],
    async () => {
      const data: ProductAll = await getData(mainQuery || "");
      return data;
    },
    {
      onSuccess: (data) => {
        setState(data.data);
        setTotal(data.total);
      },
      onError: (response: AppError) => {
        handleSetNotification({
          message: response.data.message,
          status: "error",
        });
      },
      retry: false,
      enabled: state?.length <= 1,
    }
  );

  const fetchMoreData = async () => {
    const data = await getData(mainQuery || "");
    setState(state.concat(data.data));
    setTotal(total);
  };

  useEffect(() => {
    if (pageNumber > 1) {
      fetchMoreData();
    }
  }, [pageNumber]);

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

  if (isLoading || isFetching) return <Loader />;

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
          productCount={total}
          title={title}
          setPageNumber={setPageNumber}
        />
      </section>

      <section>
        <ProductHeader
          setShow={setShow}
          show={show}
          setQuery={setQuery}
          query={query}
          setPageNumber={setPageNumber}
        />
        <ProductContent
          productData={state}
          setPageNumber={setPageNumber}
          total={total}
          pageNumber={pageNumber}
        />
      </section>
    </main>
  );
};

export default Products;
