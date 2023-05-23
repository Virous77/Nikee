import styles from "./Sneakers.module.scss";
import { Sneaker } from "../../interfaces/interface";
import React from "react";
import { useNavigate } from "react-router-dom";

type SneakersListType = {
  sneaker: Sneaker;
  layout: boolean;
};

const SneakersList: React.FC<SneakersListType> = ({ sneaker, layout }) => {
  const navigate = useNavigate();
  return (
    <div
      className={!layout ? styles["sneak-sub"] : styles["sneak-sub-grid"]}
      onClick={() => navigate(`/sneaker/${sneaker.slug}`)}
    >
      <img src={sneaker.heroImage} alt={sneaker.name} />
      {!layout && (
        <>
          <div className={styles["sneak-details"]}>
            <h2>{sneaker.name}</h2>
          </div>

          <div className={styles["sneak-action"]}>
            <button style={{ background: sneaker.color }}>Buy</button>
          </div>
        </>
      )}
    </div>
  );
};

export default SneakersList;
