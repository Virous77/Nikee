import styles from "./Profile.module.scss";
import { Modal } from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import { useCart } from "../../store/cartContext";
import Address from "../Cart/Checkout/Address";

const AddNewAddress = () => {
  const {
    setAddressData,
    addressData,
    handleAddressSubmit,
    editAddress,
    setEditAddress,
  } = useCart();

  return (
    <>
      <div className={styles["new-address"]}>
        <button onClick={() => setEditAddress("add")}>Add new</button>
      </div>

      {editAddress === "add" && (
        <Modal isOpen="isOpen" onClose={() => setEditAddress("")}>
          <section>
            <ModalHeader
              name="Edit Address"
              onClose={() => setEditAddress("")}
            />
            <Address
              setAddressData={setAddressData}
              addressData={addressData}
              handleAddressSubmit={handleAddressSubmit}
            />
          </section>
        </Modal>
      )}
    </>
  );
};

export default AddNewAddress;
