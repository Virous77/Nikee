import { iconicShoes } from "../../utils/data";
import styles from "./Home.module.scss";
import { useRef } from "react";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";

const HomeIconic = () => {
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
    <section className={styles["home-iconic"]}>
      <h2>Always Iconic</h2>

      <div className={styles["iconic-wrap"]} ref={nameRef}>
        {iconicShoes.map((shoes) => (
          <div className={styles["sub-iconic"]} key={shoes.id}>
            <img src={shoes.image} alt={shoes.name} />
            <p>{shoes.name}</p>
          </div>
        ))}
      </div>
      <div className={styles["scroll"]}>
        <button onClick={() => scrollHandler("left")} style={{ left: "3.4%" }}>
          <HiArrowSmLeft cursor="pointer" size={18} />
        </button>
        <button
          onClick={() => scrollHandler("right")}
          style={{ right: "3.4%" }}
        >
          <HiArrowSmRight cursor="pointer" size={18} />
        </button>
      </div>
    </section>
  );
};

export default HomeIconic;
