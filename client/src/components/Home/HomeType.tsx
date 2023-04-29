import styles from "./Home.module.scss";
import womenIMG from "../../assets/women.jpeg";
import menIMG from "../../assets/men.jpeg";

const HomeType = () => {
  return (
    <section className={styles["home-type"]}>
      <h2>Nike Go Ahead</h2>
      <div className={styles["home-type-wrap"]}>
        <div className={styles["first-img"]}>
          <img src={menIMG} alt="men selection" />

          <div className={styles["type-details"]}>
            <h3>Elevate your wardrobe with our selection</h3>
            <button className={styles["shop-home-button"]}>Shop</button>
          </div>
        </div>

        <div className={styles["first-img"]}>
          <img src={womenIMG} alt="women-selection" />
          <div className={styles["type-details"]}>
            <h3>Whether you're looking for a classic</h3>
            <button className={styles["shop-home-button"]}>Shop</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeType;
