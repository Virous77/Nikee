import React from "react";
import styles from "./Cart.module.scss";
import useCart from "../../hooks/useCart";
import { getLocalData } from "../../utils/data";

type PriceSummaryCardType = {
  show?: string;
};

const PriceSummaryCard: React.FC<PriceSummaryCardType> = ({ show }) => {
  const { totalPrice, totalTax } = useCart();
  const coupon = getLocalData("coupon");

  const total = totalPrice && totalTax && totalPrice + totalTax;
  const createDisc = total && total * (+coupon / 100);
  const totalDiscount = total && createDisc && total - createDisc;

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

      {coupon && (
        <div className={styles["cart-total"]}>
          <p>After Discount</p>
          <b>${totalDiscount}</b>
        </div>
      )}
      {show && <hr />}
    </>
  );
};

export default PriceSummaryCard;
