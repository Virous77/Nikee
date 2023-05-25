import styles from "./Featured.module.scss";
import { getData } from "../../api/api";
import { useQuery } from "react-query";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError, Product } from "../../interfaces/interface";
import FeaturedList from "./FeaturedList";

const FeaturedProduct = () => {
  const { handleSetNotification } = useGlobalContext();

  const { data: featuredData } = useQuery(
    ["featured-main"],
    async () => {
      const data: Product[] = await getData("/product/featured/all");
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

  return (
    <section className={styles["featured-product"]}>
      <h2>Shop Nike Featured</h2>
      <div className={styles["feature-list"]}>
        {featuredData?.map((product) => (
          <FeaturedList product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;
