import styles from "./Featured.module.scss";
import { getData } from "../../api/api";
import { useQuery } from "react-query";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError, Product } from "../../interfaces/interface";
import FeaturedList from "./FeaturedList";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../UI/Spinner";

export type QueryData = {
  total: number;
  data: Product[];
};
const FeaturedProduct = () => {
  const { handleSetNotification } = useGlobalContext();
  const [state, setState] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  useQuery(
    ["featured-main"],
    async () => {
      const data: QueryData = await getData(
        `/product/featured/all/${pageNumber}/${pageSize}`
      );
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
      enabled: state?.length <= 1,
    }
  );

  const fetchMoreData = async () => {
    const data = await getData(
      `/product/featured/all/${pageNumber}/${pageSize}`
    );
    setState(state.concat(data.data));
    setTotal(total);
  };

  useEffect(() => {
    if (pageNumber > 1) {
      fetchMoreData();
    }
  }, [pageNumber]);

  return (
    <React.Fragment>
      {state.length > 0 && (
        <section className={styles["featured-product"]}>
          <h2>Shop Nike Featured</h2>

          <InfiniteScroll
            dataLength={state.length + 1}
            next={() => setPageNumber(pageNumber + 1)}
            hasMore={state.length === total ? false : true}
            loader={
              state.length > 1 && (
                <div className="globalCenter">
                  <Spinner />
                </div>
              )
            }
            endMessage={<p></p>}
            height={800}
          >
            <div className={styles["feature-list"]}>
              {state.map((product) => (
                <FeaturedList key={product._id} product={product} />
              ))}
            </div>
          </InfiniteScroll>
        </section>
      )}
    </React.Fragment>
  );
};

export default FeaturedProduct;
