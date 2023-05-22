import HeroSneakers from "./HeroSneakers";
import styles from "./Sneakers.module.scss";

const Sneakers = () => {
  return (
    <main className={styles["sneakers"]}>
      <div>
        <HeroSneakers />
      </div>
    </main>
  );
};

export default Sneakers;
