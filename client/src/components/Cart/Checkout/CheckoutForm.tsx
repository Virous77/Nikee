import { useCart } from "../../../store/cartContext";
import styles from "./Checkout.module.scss";

const CheckoutForm = () => {
  const { address, handleChange, handleAddressSubmit } = useCart();

  const { firstName, lastName, fullAddress, city, state, postalCode } = address;

  return (
    <form
      className={styles["checkout-form"]}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles["flat-form"]}>
        <fieldset>
          <input
            type="text"
            placeholder="First name*"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <input
            type="text"
            placeholder="Last Name*"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
        </fieldset>
      </div>

      <fieldset>
        <input
          type="text"
          placeholder="Address*"
          name="fullAddress"
          value={fullAddress}
          onChange={handleChange}
        />
      </fieldset>

      <div className={styles["flat-form"]}>
        <fieldset>
          <input
            type="text"
            placeholder="City*"
            name="city"
            value={city}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset>
          <input
            type="text"
            placeholder="State*"
            name="state"
            value={state}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <input
            type="text"
            placeholder="Postal Code*"
            name="postalCode"
            value={postalCode}
            onChange={handleChange}
          />
        </fieldset>
      </div>

      <div className={styles["address-button"]}>
        <button onClick={handleAddressSubmit}>Save & Continue</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
