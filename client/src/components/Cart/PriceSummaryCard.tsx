import React from "react";
import styles from "./Cart.module.scss";
import { Cart } from "../../interfaces/interface";
import useCart from "../../hooks/useCart";

type PriceSummaryCardType = {
  show?: string;
  cartData: Cart[];
};

const PriceSummaryCard: React.FC<PriceSummaryCardType> = ({ show }) => {
  const { totalPrice, totalTax } = useCart();

  return (
    <>
      <div className={styles["summary-price"]}>
        <div className={styles["flat-details"]}>
          <p>Subtotal</p>
          <span>$ {totalPrice && totalPrice?.toFixed(2)}</span>
        </div>
        <div className={styles["flat-details"]}>
          <p>Shipping and Handling</p>
          <span>${totalTax && totalTax.toFixed(2)}</span>
        </div>
      </div>

      {show && <hr />}
      <div className={styles["cart-total"]}>
        <p>Total</p>
        <b>${totalTax && totalPrice && totalPrice + totalTax}</b>
      </div>
      {show && <hr />}
    </>
  );
};

export default PriceSummaryCard;
