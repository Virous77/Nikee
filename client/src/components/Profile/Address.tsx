import { useMutation } from "react-query";
import { UserAddress } from "../../interfaces/interface";
import styles from "./Profile.module.scss";
import { Modal } from "../Modal/Modal";
import EditAddress from "./EditAddress";
import { useState } from "react";
import { deleteData } from "../../api/api";
import DeleteAddress from "./DeleteAddress";
import { useGlobalContext } from "../../store/GlobalContext";
import { useCart } from "../../store/cartContext";
import { AppError } from "../../interfaces/interface";
import AddNewAddress from "./AddNewAddress";
import AddressList from "../Cart/Checkout/AddressList";

const Address = () => {
  const [deleteAddress, setDeleteAddress] = useState("");

  const { handleSetNotification } = useGlobalContext();
  const {
    setAddressData,
    addressData: editAddressData,
    addressInitialState,
    handleUpdateAddress,
    editAddress,
    setEditAddress,
    refetch,
    allAddressData,
  } = useCart();

  const { mutate } = useMutation(
    (id: string) => {
      return deleteData(`/address/${id}`);
    },
    {
      onSuccess: ({ message }: { message: string }) => {
        refetch();
        setDeleteAddress("");
        handleSetNotification({ message, status: "success" });
      },

      onError: ({ data }: AppError) => {
        handleSetNotification({ message: data.message, status: "error" });
      },
    }
  );

  const handleEditAddress = (address: UserAddress) => {
    localStorage.setItem("address", JSON.stringify(address._id));
    setEditAddress("edit");
    setAddressData((old) => ({
      ...old,
      address: address.address,
      addressType: address.addressType,
      city: address.city,
      landmark: address.landmark,
      postalCode: address.postalCode,
      state: address.state,
    }));
  };

  return (
    <section className={styles.address}>
      {allAddressData && allAddressData?.length > 0 ? (
        <div className={styles["address-list"]}>
          {allAddressData?.map((address) => (
            <AddressList
              key={address._id}
              title="profile"
              handleEditAddress={handleEditAddress}
              setDeleteAddress={setDeleteAddress}
              address={address}
            />
          ))}
          <AddNewAddress />
        </div>
      ) : (
        <div className={styles["no-any-address"]}>
          <AddNewAddress />
          <p className={styles["no-address"]}>
            You haven't yet added Address with us!
          </p>
        </div>
      )}
      {editAddressData && editAddress === "edit" && (
        <Modal
          isOpen="isOpen"
          onClose={() => {
            setEditAddress("");
            setAddressData(addressInitialState);
          }}
        >
          <EditAddress
            onClose={() => {
              setEditAddress("");
              setAddressData(addressInitialState);
            }}
            handleAddressSubmit={handleUpdateAddress}
          />
        </Modal>
      )}

      {deleteAddress && (
        <Modal isOpen="isOpen" onClose={() => setDeleteAddress("")}>
          <DeleteAddress
            mutate={() => mutate(deleteAddress)}
            onClose={() => setDeleteAddress("")}
          />
        </Modal>
      )}
    </section>
  );
};

export default Address;
