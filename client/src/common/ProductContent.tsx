import React from "react";
import { Product } from "../interfaces/interface";
import styles from "../components/ProductsAll/Products.module.scss";
import { useNavigate } from "react-router-dom";
import NotFound from "../components/UI/NotFound";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/UI/Loader";
import Spinner from "../components/UI/Spinner";

type ProductContentType = {
  productData: Product[];
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  total: number;
};

const ProductContent: React.FC<ProductContentType> = ({
  productData,
  setPageNumber,
  pageNumber,
  total,
}) => {
  const navigate = useNavigate();

  return (
    <section className={styles["product-content"]}>
      <InfiniteScroll
        dataLength={productData.length + 1}
        next={() => setPageNumber(pageNumber + 1)}
        hasMore={productData.length === total ? false : true}
        loader={
          productData.length > 1 && (
            <div className="globalCenter">
              <Spinner />
            </div>
          )
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            {productData.length > 0 && <b></b>}
          </p>
        }
        height={500}
      >
        {productData && productData.length > 0 ? (
          <div className={styles["prod-list"]}>
            {productData?.map((product) => (
              <div
                key={product._id}
                className={styles["prod-sub"]}
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                <img src={product.heroImage} alt={product.name} />

                <div className={styles["prod-details"]}>
                  <h3>{product.name}</h3>
                  <p>
                    {product.productType}'s {product.category}
                  </p>
                  <p style={{ margin: "4px" }}>1 Colour</p>

                  <b>MPR: ${product.amount.toFixed(2)}</b>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NotFound message="No product found" />
        )}
      </InfiniteScroll>
    </section>
  );
};

export default ProductContent;
