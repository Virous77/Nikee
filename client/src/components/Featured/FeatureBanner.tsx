import { featuredCategory } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import styles from "./Featured.module.scss";

const FeatureBanner = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["banner"]}>
      <h2>The Essentials</h2>
      <div className={styles["banner-list"]}>
        {featuredCategory.map((type) => (
          <div
            key={type.id}
            onClick={() => navigate(type.link)}
            className={styles["banner-sub"]}
          >
            <img src={type.image} alt="nike" />
            <p>{type.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureBanner;
