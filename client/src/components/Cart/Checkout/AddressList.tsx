import React from "react";
import { UserAddress } from "../../../interfaces/interface";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import styles from "../../Profile/Profile.module.scss";

type AddressListType = {
  address: UserAddress;
  setDeleteAddress?: React.Dispatch<React.SetStateAction<string>>;
  handleEditAddress?: (address: UserAddress) => void;
  title?: string;
};

const AddressList: React.FC<AddressListType> = ({
  address,
  title,
  setDeleteAddress,
  handleEditAddress,
}) => {
  return (
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

        {title === "profile" && (
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
        )}
      </div>
    </div>
  );
};

export default AddressList;
