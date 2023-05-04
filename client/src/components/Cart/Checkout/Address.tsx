import React from "react";
import { AddressType } from "../../../types/type";
import CheckoutForm from "./CheckoutForm";
import styles from "./Checkout.module.scss";

type AddressPropsType = {
  setAddressData: React.Dispatch<React.SetStateAction<AddressType>>;
  addressData: AddressType;
  handleAddressSubmit: () => void;
};

const Address: React.FC<AddressPropsType> = ({
  setAddressData,
  addressData,
  handleAddressSubmit,
}) => {
  return (
    <div className={styles["address-card"]}>
      <div className={styles["address-type"]}>
        <span
          onClick={() =>
            setAddressData({ ...addressData, addressType: "home" })
          }
          className={
            addressData.addressType === "home"
              ? styles["active-tab"]
              : styles["unactive-tab"]
          }
        >
          Home
        </span>

        <span
          onClick={() =>
            setAddressData({ ...addressData, addressType: "office" })
          }
          className={
            addressData.addressType === "office"
              ? styles["active-tab"]
              : styles["unactive-tab"]
          }
        >
          Office
        </span>
      </div>
      <CheckoutForm handleAddressSubmit={handleAddressSubmit} />
    </div>
  );
};

export default Address;
