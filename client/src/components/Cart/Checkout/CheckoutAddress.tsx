import styles from "./Checkout.module.scss";
import CheckoutForm from "./CheckoutForm";
import { useCart } from "../../../store/cartContext";

const CheckoutAddress = () => {
  const { addressData, setAddressData } = useCart();

  return (
    <section className={styles["checkout-address"]}>
      <h2>Delivery Address</h2>

      <div className={styles["address-card"]}>
        <div className={styles["address-type"]}>
          <span
            onClick={() =>
              setAddressData({ ...addressData, addressType: "home" })
            }
          >
            Home
          </span>
          <span
            onClick={() =>
              setAddressData({ ...addressData, addressType: "office" })
            }
          >
            Office
          </span>
        </div>
        <CheckoutForm />
      </div>
    </section>
  );
};

export default CheckoutAddress;
