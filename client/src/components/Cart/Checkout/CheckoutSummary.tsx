import styles from "./Checkout.module.scss";
import PriceSummaryCard from "../PriceSummaryCard";
import CheckoutProductList from "./CheckoutProductList";

const CheckoutSummary = () => {
  return (
    <section className={styles["checkout-summary"]}>
      <div className={styles["checkout-summary-head"]}>
        <h2>In Your Bag</h2>
        <span>Edit</span>
      </div>
      <PriceSummaryCard />
      <CheckoutProductList />
    </section>
  );
};

export default CheckoutSummary;
