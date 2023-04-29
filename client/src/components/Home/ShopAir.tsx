import shopAir from "../../assets/shopAir.jpeg";
import styles from "./Home.module.scss";

const ShopAir = () => {
  return (
    <section className={styles["hero-shoes"]}>
      <h2>Best of Air Max</h2>
      <div>
        <img src={shopAir} alt="air shoes" />
      </div>

      <div className={styles["hero-shoes-about"]}>
        <h1>BRING THE VIBES</h1>
        <p>
          Add legendary style to any look with the Air Max 270, Air Max TW SE,
          and more.
        </p>

        <button>Shop All Air Max</button>
      </div>
    </section>
  );
};

export default ShopAir;
