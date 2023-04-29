import { useRef } from "react";
import styles from "./Home.module.scss";
import { popularShoes } from "../../utils/data";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";

const HomePopular = () => {
  const nameRef = useRef<HTMLDivElement>();

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
      <div className={styles["popular-head"]}>
        <h2>Popular Right Now</h2>
        <div className={styles["popular-button"]}>
          <button onClick={() => scrollHandler("left")}>
            <HiArrowSmLeft cursor="pointer" size={18} />
          </button>
          <button onClick={() => scrollHandler("right")}>
            <HiArrowSmRight cursor="pointer" size={18} />
          </button>
        </div>
      </div>

      <div ref={nameRef} className={styles["popular-wrap"]}>
        {popularShoes.map((shoes) => (
          <div className={styles["popular-sub"]} key={shoes.id}>
            <img src={shoes.Image} alt={shoes.name} />
            <div className={styles["popular-details"]}>
              <p>{shoes.name}</p>
              <p>${shoes.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomePopular;
