import styles from "./Home.module.scss";
import React, { useRef } from "react";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";
import { getData } from "../../api/api";
import { useQuery } from "react-query";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError, Sneaker } from "../../interfaces/interface";
import { useNavigate } from "react-router-dom";
import FlexShimmer from "../../common/shimmers/FlexShimmer";

const HomeIconic = () => {
  const nameRef = useRef<HTMLDivElement>(null);
  const { handleSetNotification } = useGlobalContext();
  const navigate = useNavigate();

  const { data: sneakers, isLoading } = useQuery(
    ["sneaker-hone"],
    async () => {
      const data: Sneaker[] = await getData(`/sneaker/iconic/star/all`);
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
    <React.Fragment>
      {sneakers && sneakers?.length > 0 && (
        <section className={styles["home-iconic"]}>
          {!isLoading && (
            <>
              <h2>Always Iconic</h2>

              <div className={styles["iconic-wrap"]} ref={nameRef}>
                {sneakers &&
                  sneakers.map((shoes) => (
                    <div
                      className={styles["sub-iconic"]}
                      key={shoes._id}
                      onClick={() => navigate(`/sneaker/${shoes.slug}`)}
                    >
                      <img src={shoes.heroImage} alt={shoes.name} />
                      <p>
                        {shoes.name.length > 15
                          ? `${shoes.name.substring(0, 15)}..`
                          : shoes.name}
                      </p>
                    </div>
                  ))}
              </div>
            </>
          )}

          {!isLoading && (
            <>
              {sneakers && sneakers.length >= 4 && (
                <div className={styles["scroll"]}>
                  <button
                    onClick={() => scrollHandler("left")}
                    style={{ left: "3.4%" }}
                  >
                    <HiArrowSmLeft cursor="pointer" size={18} />
                  </button>
                  <button
                    onClick={() => scrollHandler("right")}
                    style={{ right: "3.4%" }}
                  >
                    <HiArrowSmRight cursor="pointer" size={18} />
                  </button>
                </div>
              )}
            </>
          )}

          {isLoading && <FlexShimmer stylesClass="home-box" />}
        </section>
      )}
    </React.Fragment>
  );
};

export default HomeIconic;
