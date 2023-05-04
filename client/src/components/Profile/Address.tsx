import { useMutation } from "react-query";
import { UserAddress } from "../../interfaces/interface";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import styles from "./Profile.module.scss";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Modal } from "../Modal/Modal";
import EditAddress from "./EditAddress";
import { useState } from "react";
import { deleteData } from "../../api/api";
import DeleteAddress from "./DeleteAddress";
import { useGlobalContext } from "../../store/GlobalContext";
import { useCart } from "../../store/cartContext";
import { AppError } from "../../interfaces/interface";

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
      console.log(id);
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
    setEditAddress(true);
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
      <div className={styles["address-list"]}>
        {allAddressData?.map((address) => (
          <div key={address._id} className={styles["address-card"]}>
            {address.addressType === "home" ? (
              <h4>
                <AiOutlineHome /> Home
              </h4>
            ) : (
              <h4>
                <HiOutlineOfficeBuilding /> Office
              </h4>
            )}

            <p>{address.address}</p>
            <p>{address.landmark}</p>

            <div className={styles["address-action-box"]}>
              <span>
                {address.city} {address.state} {address.postalCode}
              </span>

              <div className={styles["address-action"]}>
                <CiEdit
                  cursor="pointer"
                  onClick={() => handleEditAddress(address)}
                />
                <MdOutlineDeleteOutline
                  cursor="pointer"
                  onClick={() => setDeleteAddress(address._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {editAddressData && editAddress && (
        <Modal
          isOpen="isOpen"
          onClose={() => {
            setEditAddress(false);
            setAddressData(addressInitialState);
          }}
        >
          <EditAddress
            onClose={() => {
              setEditAddress(false);
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
