import React from "react";
import { Sneaker } from "../../interfaces/interface";
import styles from "./Sneakers.module.scss";
import HtmlParser from "../../common/HtmlParser";
import SneakerSize from "./SneakerSize";

type SneakerDetailsType = {
  sneaker: Sneaker | undefined;
};

const SneakerDetails: React.FC<SneakerDetailsType> = ({ sneaker }) => {
  return (
    <div className={styles["single-sneak-det"]}>
      <div className={styles["sneak-sing-head"]}>
        <p>{sneaker?.color}</p>
        <h2>{sneaker?.name}</h2>

        <b>MRP : ${sneaker?.amount?.toFixed(2)}</b>
        <span>incl. of all taxes</span>
        <span>(Also includes all applicable duties)</span>
      </div>

      <div className={styles["sneak-content"]}>
        <HtmlParser data={sneaker?.aboutSneaker} />
      </div>

      <div className={styles["sneak-number"]}>
        <p>Product Information:</p>
        <span>SKU: {sneaker?._id.slice(2, 12)}</span>
      </div>

      <div className={styles["sneak-information"]}>
        <HtmlParser data={sneaker?.sneakerInformation} />
      </div>

      <SneakerSize size={sneaker?.size} />

      <div className={styles["buy"]}>
        <button>BUY</button>
      </div>
    </div>
  );
};

export default SneakerDetails;
