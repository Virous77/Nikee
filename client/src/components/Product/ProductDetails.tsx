import styles from "./Product.module.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError } from "../../interfaces/interface";
import { Product } from "../../interfaces/interface";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductDetailsShimmer from "../../common/shimmers/ProductDetailsShimmer";
import RelatedProduct from "../RelatedProduct/RelatedProduct";

const ProductDetails = () => {
  const { name } = useParams();
  const { handleSetNotification } = useGlobalContext();

  const { data, isLoading } = useQuery(
    [name],
    async () => {
      const data: Product = await getData(`/product/${name}`);
      return data;
    },
    {
      onError: ({ data }: AppError) => {
        handleSetNotification({
          message: data.message,
          status: "error",
        });
      },
      retry: false,
    }
  );

  return (
    <main className={styles["product-d"]}>
      {!isLoading ? (
        <div className={styles["product-d-wrap"]}>
          <ProductImage
            images={data ? [data?.heroImage, ...data.images] : []}
          />
          <ProductInfo productDetails={data} />
        </div>
      ) : (
        <ProductDetailsShimmer />
      )}
      <RelatedProduct
        endPoints={`/product/related/${data?.category || "Shoes"}`}
        title="Related Products"
        link="product"
        type={data?.category || "Shoes"}
      />
    </main>
  );
};

export default ProductDetails;
