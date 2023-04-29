import styles from "./Home.module.scss";
import HeroImage from "./HeroImage";
import HomeType from "./HomeType";
import ShopAir from "./ShopAir";
import HomeIconic from "./HomeIconic";
import HomePopular from "./HomePopular";

const Home = () => {
  return (
    <main className={styles.home}>
      <div className={styles["home-wrap"]}>
        <HeroImage />
        <HomeType />
        <ShopAir />
      </div>
      <HomeIconic />
      <HomePopular />
    </main>
  );
};

export default Home;
