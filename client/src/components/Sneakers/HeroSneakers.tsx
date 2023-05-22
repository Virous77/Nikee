import styles from "./Sneakers.module.scss";
import heroImg from "../../assets/sneakerHero.jpeg";

const HeroSneakers = () => {
  return (
    <section className={styles["sneak-hero"]}>
      <img src={heroImg} alt="Sneaker-hero" />
    </section>
  );
};

export default HeroSneakers;
