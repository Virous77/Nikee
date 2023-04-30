import styles from "./Checkout.module.scss";

const CheckoutForm = () => {
  return (
    <form className={styles["checkout-form"]}>
      <div className={styles["flat-form"]}>
        <fieldset>
          <input type="text" placeholder="First name*" />
        </fieldset>

        <fieldset>
          <input type="text" placeholder="Last Name*" />
        </fieldset>
      </div>

      <fieldset>
        <input type="text" placeholder="Address*" />
      </fieldset>

      <div className={styles["flat-form"]}>
        <fieldset>
          <input type="text" placeholder="City*" />
        </fieldset>
        <fieldset>
          <input type="text" placeholder="State*" />
        </fieldset>

        <fieldset>
          <input type="text" placeholder="Postal Code*" />
        </fieldset>
      </div>

      <div className={styles["address-button"]}>
        <button>Save & Continue</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
