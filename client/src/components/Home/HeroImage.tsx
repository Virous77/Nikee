import React from "react";
import heroImage from "../../assets/hero.jpeg";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";

export type HeroImageType = {
  heroData:
    | {
        image: string;
        title: string;
        description: string;
      }
    | undefined;
};

const HeroImage: React.FC<HeroImageType> = ({ heroData }) => {
  const navigate = useNavigate();

  return (
    <section className={styles["hero-image"]}>
      <img src={heroData?.image || heroImage} alt="nike ad" />

      <div className={styles["hero-about"]}>
        <h1> {heroData?.title || "FITNESS GEAR FOR ALL YOU DO"}</h1>
        <p>
          {heroData?.description ||
            "Wherever your workout takes you, we have you covered with new men's fitness apparel."}
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
