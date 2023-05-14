import React, { useMemo } from "react";
import styles from "./Cart.module.scss";
import { Cart } from "../../interfaces/interface";

type PriceSummaryCardType = {
  show?: string;
  cartData: Cart[];
};

const PriceSummaryCard: React.FC<PriceSummaryCardType> = ({
  show,
  cartData: cart,
}) => {
  const subTotal = useMemo(() => {
    const data = cart
      ?.map((item) => item.productPrice)
      ?.reduce((acc, curr) => acc + curr, 0);

    return data;
  }, [cart]);

  const Total = useMemo(() => {
    const data = cart
      ?.map((item) => item.quantity)
      ?.reduce((acc, curr) => acc + curr, 0);

    return data;
  }, [cart]);

  const totalPrice = subTotal * Total;
  const totalTax = totalPrice && totalPrice * 0.1;

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
