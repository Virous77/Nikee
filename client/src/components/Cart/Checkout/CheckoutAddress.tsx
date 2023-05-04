import styles from "./Checkout.module.scss";
import { useCart } from "../../../store/cartContext";
import Address from "./Address";

const CheckoutAddress = () => {
  const { addressData, setAddressData, handleAddressSubmit } = useCart();

  return (
    <section className={styles["checkout-address"]}>
      <h2>Delivery Address</h2>
      <Address
        setAddressData={setAddressData}
        addressData={addressData}
        handleAddressSubmit={handleAddressSubmit}
      />
    </section>
  );
};

export default CheckoutAddress;
