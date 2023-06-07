import styles from "./Home.module.scss";
import womenIMG from "../../assets/women.jpeg";
import menIMG from "../../assets/men.jpeg";
import { useNavigate } from "react-router-dom";
import React from "react";

type HomeTypes = {
  homeData:
    | {
        men: {
          image: string;
          title: string;
        };
        women: {
          image: string;
          title: string;
        };
      }
    | undefined;
};

const HomeType: React.FC<HomeTypes> = ({ homeData }) => {
  const navigate = useNavigate();

  return (
    <section className={styles["home-type"]}>
      <h2>Nike Go Ahead</h2>
      <div className={styles["home-type-wrap"]}>
        <div className={styles["first-img"]}>
          <img src={homeData?.men.image || menIMG} alt="men selection" />

          <div className={styles["type-details"]}>
            <h3>
              {homeData?.men.title ||
                "Elevate your wardrobe with our selection"}
            </h3>
            <button
              className={styles["shop-home-button"]}
              onClick={() => navigate("/men")}
            >
              Shop
            </button>
          </div>
        </div>

        <div className={styles["first-img"]}>
          <img src={homeData?.women.image || womenIMG} alt="women-selection" />
          <div className={styles["type-details"]}>
            <h3>
              {homeData?.women.title || "Whether you're looking for a classic"}
            </h3>
            <button
              className={styles["shop-home-button"]}
              onClick={() => navigate("/women")}
            >
              Shop
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeType;
