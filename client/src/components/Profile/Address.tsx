import { getData } from "../../api/api";
import { useQuery, useMutation } from "react-query";
import { useAuthContext } from "../../store/authContext";
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

const Address = () => {
  const [address, setAddress] = useState<UserAddress | null>(null);
  const [deleteAddress, setDeleteAddress] = useState("");
  const { UserData } = useAuthContext();
  const { handleSetNotification } = useGlobalContext();

  const { data: addressData, refetch } = useQuery(
    ["address"],
    (): Promise<UserAddress[]> => getData(`/address/${UserData?._id}`)
  );

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

      onError: (data) => {
        console.log(data);
      },
    }
  );

  return (
    <section className={styles.address}>
      <div className={styles["address-list"]}>
        {addressData?.map((address) => (
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
                <CiEdit cursor="pointer" onClick={() => setAddress(address)} />
                <MdOutlineDeleteOutline
                  cursor="pointer"
                  onClick={() => setDeleteAddress(address._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {address && (
        <Modal isOpen="isOpen" onClose={() => setAddress(null)}>
          <EditAddress />
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
