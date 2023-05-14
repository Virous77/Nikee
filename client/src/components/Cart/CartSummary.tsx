import styles from "./Cart.module.scss";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PriceSummaryCard from "./PriceSummaryCard";
import { Cart } from "../../interfaces/interface";

type CartSummaryType = {
  cartData: Cart[];
};

const CartSummary: React.FC<CartSummaryType> = ({ cartData }) => {
  const [showPromo, setShowPromo] = useState(false);
  const navigate = useNavigate();

  return (
    <section className={styles["order-summary"]}>
      <h2>Summary</h2>

      <div className={styles["order-card"]}>
        <div className={styles["promo"]}>
          <div className={styles["promo-active"]}>
            <h4>Do you have a Promo Code?</h4>
            {!showPromo ? (
              <MdOutlineKeyboardArrowUp
                onClick={() => setShowPromo(true)}
                size={22}
                cursor="pointer"
              />
            ) : (
              <MdOutlineKeyboardArrowDown
                onClick={() => setShowPromo(false)}
                size={22}
                cursor="pointer"
              />
            )}
          </div>

          <div
            className={showPromo ? styles["show-promo"] : styles["hide-promo"]}
          >
            <input type="text" placeholder="Enter Promo Code" />
            <button>Apply</button>
          </div>
        </div>
        <PriceSummaryCard show="active" cartData={cartData} />
        <div className={styles["cart-checkout"]}>
          <button
            className={styles["checkout-button"]}
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartSummary;
