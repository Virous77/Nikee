import React from "react";
import { useCart } from "../../../store/cartContext";
import styles from "./Checkout.module.scss";

type CheckoutFormType = {
  handleAddressSubmit: () => void;
};
const CheckoutForm: React.FC<CheckoutFormType> = ({ handleAddressSubmit }) => {
  const { addressData, handleChange, isLoading, updateLoading } = useCart();

  const { address, city, state, postalCode, landmark } = addressData;

  return (
    <form
      className={styles["checkout-form"]}
      onSubmit={(e) => e.preventDefault()}
    >
      <fieldset>
        <input
          type="text"
          placeholder="Address*"
          name="address"
          value={address}
          onChange={handleChange}
        />
      </fieldset>

      <div className={styles["flat-form"]}>
        <fieldset>
          <input
            type="text"
            placeholder="Landmark*"
            name="landmark"
            value={landmark}
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
      </div>

      <div className={styles["address-button"]}>
        <button onClick={handleAddressSubmit}>
          {isLoading || updateLoading ? "Processing..." : "Save & Continue"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
