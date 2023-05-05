import styles from "./Checkout.module.scss";
import { useCart } from "../../../store/cartContext";
import Address from "./Address";
import AddressList from "./AddressList";

const CheckoutAddress = () => {
  const { addressData, setAddressData, handleAddressSubmit, allAddressData } =
    useCart();

  return (
    <section className={styles["checkout-address"]}>
      <h2>Delivery Address</h2>

      {allAddressData && allAddressData.length > 0 ? (
        <div className={styles["checkout-address-list"]}>
          {allAddressData?.map((address) => (
            <AddressList key={address._id} address={address} />
          ))}
        </div>
      ) : (
        <Address
          setAddressData={setAddressData}
          addressData={addressData}
          handleAddressSubmit={handleAddressSubmit}
        />
      )}
    </section>
  );
};

export default CheckoutAddress;
