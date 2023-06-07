import shopAir from "../../assets/shopAir.jpeg";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { HeroImageType } from "./HeroImage";

const ShopAir: React.FC<HeroImageType> = ({ heroData }) => {
  const navigate = useNavigate();

  return (
    <section className={styles["hero-shoes"]}>
      <h2>Best of Air Max</h2>
      <div>
        <img src={heroData?.image || shopAir} alt="air shoes" />
      </div>

      <div className={styles["hero-shoes-about"]}>
        <h1>{heroData?.title || "BRING THE VIBES"}</h1>
        <p>
          {heroData?.description ||
            "Add legendary style to any look with the Air Max 270, Air Max TW SE, and more."}
        </p>

        <button onClick={() => navigate("/product/men/Shoes")}>
          Shop All Air Max
        </button>
      </div>
    </section>
  );
};

export default ShopAir;
