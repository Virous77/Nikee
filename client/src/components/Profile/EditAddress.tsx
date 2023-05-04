import Address from "../Cart/Checkout/Address";
import { useCart } from "../../store/cartContext";
import ModalHeader from "../Modal/ModalHeader";
import React from "react";

type EditAddressType = {
  onClose: () => void;
  handleAddressSubmit: () => void;
};

const EditAddress: React.FC<EditAddressType> = ({
  onClose,
  handleAddressSubmit,
}) => {
  const { addressData, setAddressData } = useCart();

  return (
    <section>
      <ModalHeader name="Edit Address" onClose={onClose} />
      <Address
        setAddressData={setAddressData}
        addressData={addressData}
        handleAddressSubmit={handleAddressSubmit}
      />
    </section>
  );
};

export default EditAddress;
