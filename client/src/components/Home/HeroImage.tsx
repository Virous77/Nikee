import heroImage from "../../assets/hero.jpeg";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";

const HeroImage = () => {
  const navigate = useNavigate();

  return (
    <section className={styles["hero-image"]}>
      <img src={heroImage} alt="nike ad" />

      <div className={styles["hero-about"]}>
        <h1>FITNESS GEAR FOR ALL YOU DO</h1>
        <p>
          Wherever your workout takes you, we have you covered with new men's
          fitness apparel.
        </p>

        <button
          className={styles["shop-home-button"]}
          onClick={() => navigate("/sneakers")}
        >
          Shop
        </button>
      </div>
    </section>
  );
};

export default HeroImage;
