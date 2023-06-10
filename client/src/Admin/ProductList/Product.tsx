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
import EditModal from "./EditModal";
import Spinner from "../../components/UI/Spinner";

export type QueryData = {
  total: number;
  data: Product[];
};

export type ShowType = {
  product: Product | undefined;
  name: string;
};

const Products = () => {
  const [state, setState] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [productDetails, setProductDetails] = useState<ShowType | undefined>(
    undefined
  );
  const pageSize = 10;

  const { isFetching, refetch } = useQuery(
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
        loader={
          state.length > 1 && (
            <div className="globalCenter">
              <Spinner />
            </div>
          )
        }
        endMessage={
          <p style={{ textAlign: "center" }}>{state.length > 0 && <b></b>}</p>
        }
      >
        <ul className={styles["product-wrap"]}>
          {state.map((product) => (
            <ProductList
              key={product._id}
              product={product}
              setProductDetails={setProductDetails}
              active="yes"
            />
          ))}
        </ul>
      </InfiniteScroll>

      {productDetails?.name === "delete" && (
        <Modal isOpen="isOpen" onClose={() => setProductDetails(undefined)}>
          <ModalHeader
            name="Details"
            onClose={() => setProductDetails(undefined)}
          />
          <ProductModal
            productDetails={productDetails.product}
            setProduct={setProductDetails}
            refetch={refetch}
            endPoints="product"
            title="Product"
          />
        </Modal>
      )}

      {productDetails?.name === "edit" && (
        <Modal isOpen="isOpen" onClose={() => setProductDetails(undefined)}>
          <ModalHeader
            name="Edit"
            onClose={() => setProductDetails(undefined)}
          />
          <EditModal
            productDetails={productDetails.product}
            setProduct={setProductDetails}
            refetch={refetch}
            endPoints="product"
            title="Product"
          />
        </Modal>
      )}
    </main>
  );
};

export default Products;
