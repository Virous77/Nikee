import { useRef } from "react";
import styles from "./Home.module.scss";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError, Product } from "../../interfaces/interface";
import FlexShimmer from "../../common/shimmers/FlexShimmer";

const HomePopular = () => {
  const nameRef = useRef<HTMLDivElement>(null);
  const { handleSetNotification } = useGlobalContext();

  const { data: products, isLoading } = useQuery(
    ["popular"],
    async () => {
      const data: Product[] = await getData(`/product/popular/all`);
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

  const scrollHandler = (id: string) => {
    if (!nameRef.current) return;

    if (id === "right") {
      nameRef.current.scrollBy({
        top: 0,
        left: 400,
        behavior: "smooth",
      });
    } else {
      nameRef.current.scrollBy({
        top: 0,
        left: -400,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles["home-popular"]}>
      {!isLoading && (
        <div className={styles["popular-head"]}>
          <h2>Popular Right Now</h2>
          {products && products.length >= 4 && (
            <div className={styles["popular-button"]}>
              <button onClick={() => scrollHandler("left")}>
                <HiArrowSmLeft cursor="pointer" size={18} />
              </button>
              <button onClick={() => scrollHandler("right")}>
                <HiArrowSmRight cursor="pointer" size={18} />
              </button>
            </div>
          )}
        </div>
      )}

      {!isLoading && (
        <div ref={nameRef} className={styles["popular-wrap"]}>
          {products &&
            products.map((shoes) => (
              <div className={styles["popular-sub"]} key={shoes._id}>
                <img src={shoes.heroImage} alt={shoes.name} />
                <div className={styles["popular-details"]}>
                  <p>{shoes.name}</p>
                  <p>${shoes.amount}</p>
                </div>
              </div>
            ))}
        </div>
      )}
      {isLoading && <FlexShimmer />}
    </section>
  );
};

export default HomePopular;
