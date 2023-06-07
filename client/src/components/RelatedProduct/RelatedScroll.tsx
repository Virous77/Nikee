import React from "react";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";
import { RelatedData } from "../../interfaces/interface";
import { useNavigate } from "react-router-dom";
import FlexShimmer from "../../common/shimmers/FlexShimmer";
import styles from "../Home/Home.module.scss";

type RelatedScrollType = {
  isLoading: boolean;
  products: RelatedData[] | undefined;
  scrollHandler: (e: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nameRef: any;
  title: string;
  link: string;
};

const RelatedScroll: React.FC<RelatedScrollType> = ({
  isLoading,
  products,
  scrollHandler,
  nameRef,
  title,
  link,
}) => {
  const navigate = useNavigate();

  const handleScroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className={styles["home-popular"]}>
      {!isLoading && (
        <div className={styles["popular-head"]}>
          <h2>{title}</h2>
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
            products.map((product) => (
              <div
                className={styles["popular-sub"]}
                key={product._id}
                onClick={() => {
                  handleScroll();
                  navigate(`/${link || "product"}/${product.slug}`);
                }}
              >
                <img src={product.heroImage} alt={product.name} />
                <div className={styles["popular-details"]}>
                  <p>{product.name}</p>
                  <p>${product.amount}</p>
                </div>
              </div>
            ))}
        </div>
      )}
      {isLoading && <FlexShimmer stylesClass="home-box" />}
    </section>
  );
};

export default RelatedScroll;
