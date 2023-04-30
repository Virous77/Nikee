import styles from "./Checkout.module.scss";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutHead from "./CheckoutHead";

const Checkout = () => {
  return (
    <main className={styles["checkout"]}>
      <CheckoutHead />

      <div className={styles["checkout-content"]}>
        <CheckoutAddress />
        <CheckoutSummary />
      </div>
    </main>
  );
};

export default Checkout;
