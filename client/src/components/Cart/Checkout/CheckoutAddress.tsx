import styles from "./Checkout.module.scss";
import { useCart } from "../../../store/cartContext";
import Address from "./Address";
import AddressList from "./AddressList";
import { useState } from "react";
import { UserAddress } from "../../../interfaces/interface";
import { usePayment } from "../../../store/paymentContext";

const CheckoutAddress = () => {
  const { addressData, setAddressData, handleAddressSubmit, allAddressData } =
    useCart();
  const [checkoutAddress, setCheckoutAddress] = useState<UserAddress | null>(
    null
  );
  const { handlePayment } = usePayment();
  const handleAddress = (address: UserAddress) => {
    setCheckoutAddress(checkoutAddress ? null : address);
    localStorage.setItem("checkout", JSON.stringify(address));
  };

  return (
    <section className={styles["checkout-address"]}>
      <h2>Delivery Address</h2>

      {allAddressData && allAddressData.length > 0 ? (
        <div className={styles["checkout-list-m"]}>
          <div className={styles["checkout-address-list"]}>
            {allAddressData?.map((address) => (
              <AddressList
                key={address._id}
                address={address}
                classStyle={
                  checkoutAddress?._id === address._id
                    ? "address-card-list"
                    : "address-card-list-n"
                }
                onClick={handleAddress}
              />
            ))}
          </div>

          <button onClick={handlePayment} disabled={!checkoutAddress}>
            Continue
          </button>
        </div>
      ) : (
        <>
          <Address
            setAddressData={setAddressData}
            addressData={addressData}
            handleAddressSubmit={handleAddressSubmit}
          />
        </>
      )}
    </section>
  );
};

export default CheckoutAddress;
