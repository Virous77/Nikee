import heroImg from "../../assets/sneakerHero.jpeg";
import styles from "./Featured.module.scss";

const FeaturedHero = () => {
  return (
    <section className={styles["featured-hero"]}>
      <img src={heroImg} alt="featured-hero" />
    </section>
  );
};

export default FeaturedHero;
