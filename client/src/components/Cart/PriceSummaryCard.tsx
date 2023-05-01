import React from "react";
import styles from "./Cart.module.scss";

type PriceSummaryCardType = {
  show?: string;
};

const PriceSummaryCard: React.FC<PriceSummaryCardType> = ({ show }) => {
  return (
    <>
      <div className={styles["summary-price"]}>
        <div className={styles["flat-details"]}>
          <p>Subtotal</p>
          <span>$1,315.00</span>
        </div>
        <div className={styles["flat-details"]}>
          <p>Shipping and Handling</p>
          <span>$7.00</span>
        </div>
      </div>

      {show && <hr />}
      <div className={styles["cart-total"]}>
        <p>Total</p>
        <b>$1,322.00</b>
      </div>
      {show && <hr />}
    </>
  );
};

export default PriceSummaryCard;
