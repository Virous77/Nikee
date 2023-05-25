import styles from "./Featured.module.scss";
import FeaturedHero from "./FeaturedHero";
import FeatureScroll from "./FeatureScroll";
import FeaturedProduct from "./FeaturedProduct";
import FeatureBanner from "./FeatureBanner";

const Featured = () => {
  return (
    <div className={styles["featured"]}>
      <FeaturedHero />
      <FeatureScroll />
      <FeaturedProduct />
      <FeatureBanner />
    </div>
  );
};

export default Featured;
