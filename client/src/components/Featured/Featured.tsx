import styles from "./Featured.module.scss";
import FeaturedHero from "./FeaturedHero";
import FeatureScroll from "./FeatureScroll";
import FeaturedProduct from "./FeaturedProduct";

const Featured = () => {
  return (
    <div className={styles["featured"]}>
      <FeaturedHero />
      <FeatureScroll />
      <FeaturedProduct />
    </div>
  );
};

export default Featured;
