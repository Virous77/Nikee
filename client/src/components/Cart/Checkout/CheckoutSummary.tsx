import styles from "./Checkout.module.scss";

const CheckoutSummary = () => {
  return (
    <section className={styles["checkout-summary"]}>
      <div>
        <h2>In Your Bag</h2>
        <span>Edit</span>
      </div>
    </section>
  );
};

export default CheckoutSummary;
