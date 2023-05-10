import styles from "./Product.module.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError } from "../../interfaces/interface";
import { Product } from "../../interfaces/interface";

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
      <div className={styles["product-d-wrap"]}>
        <p>cool</p>
      </div>
    </main>
  );
};

export default ProductDetails;
