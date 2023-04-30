import styles from "./Checkout.module.scss";
import CheckoutForm from "./CheckoutForm";

const CheckoutAddress = () => {
  return (
    <section className={styles["checkout-address"]}>
      <h2>Delivery Address</h2>

      <div className={styles["address-card"]}>
        <div className={styles["address-type"]}>
          <span>Home</span>
          <span>Office</span>
        </div>
        <CheckoutForm />
      </div>
    </section>
  );
};

export default CheckoutAddress;
