import styles from "./Checkout.module.scss";
import PriceSummaryCard from "../PriceSummaryCard";
import CheckoutProductList from "./CheckoutProductList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CheckoutSummary = () => {
  const navigate = useNavigate();
  const [showCartItem, setShowCartItenm] = useState(false);

  return (
    <section className={styles["checkout-summary"]}>
      <div className={styles["checkout-summary-head"]}>
        <h2>In Your Bag</h2>
        <span onClick={() => navigate("/cart")}>Edit</span>
      </div>
      <div className={showCartItem ? styles["showItem"] : styles["hideItem"]}>
        <PriceSummaryCard />
      </div>

      <div className={showCartItem ? styles["showItem"] : styles["hideItem"]}>
        <CheckoutProductList />
      </div>
    </section>
  );
};

export default CheckoutSummary;
