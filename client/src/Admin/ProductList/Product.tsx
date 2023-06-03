import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { Product } from "../../interfaces/interface";
import Loader from "../../components/UI/Loader";
import ProductList from "./ProductList";
import styles from "./Style.module.scss";
import ProductModal from "./ProductModal";
import { Modal } from "../../components/Modal/Modal";
import ModalHeader from "../../components/Modal/ModalHeader";

type QueryData = {
  total: number;
  data: Product[];
};

const Products = () => {
  const [state, setState] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [productDetails, setProductDetails] = useState<Product | undefined>(
    undefined
  );
  const pageSize = 10;

  const { isFetching } = useQuery(
    ["admin-product"],
    async () => {
      const data: QueryData = await getData(
        `/product/pagination/${pageNumber}/${pageSize}`
      );
      return data;
    },
    {
      onSuccess: (data) => {
        setState(data.data);
        setTotal(data.total);
      },

      enabled: state.length <= 1,
    }
  );

  const fetchMoreData = async () => {
    const data: QueryData = await getData(
      `/product/pagination/${pageNumber}/${pageSize}`
    );
    setState(state.concat(data.data));
    setTotal(total);
  };

  useEffect(() => {
    if (pageNumber > 1) {
      fetchMoreData();
    }
  }, [pageNumber]);

  if (isFetching) return <Loader />;

  return (
    <main className={styles["product-main"]}>
      <InfiniteScroll
        dataLength={state.length + 1}
        next={() => setPageNumber(pageNumber + 1)}
        hasMore={state.length === total ? false : true}
        loader={state.length > 1 ? <h4>Loading...</h4> : <Loader />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            {state.length > 0 && <b>Yay! You have seen it all</b>}
          </p>
        }
      >
        <ul className={styles["product-wrap"]}>
          {state.map((product) => (
            <ProductList
              key={product._id}
              product={product}
              setProductDetails={setProductDetails}
            />
          ))}
        </ul>
      </InfiniteScroll>

      {productDetails && (
        <Modal isOpen="isOpen" onClose={() => setProductDetails(undefined)}>
          <ModalHeader
            name="Details"
            onClose={() => setProductDetails(undefined)}
          />
          <ProductModal productDetails={productDetails} />
        </Modal>
      )}
    </main>
  );
};

export default Products;
