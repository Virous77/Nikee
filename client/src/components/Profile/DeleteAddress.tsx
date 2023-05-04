/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ModalHeader from "../Modal/ModalHeader";
import styles from "./Profile.module.scss";

type DeleteAddressType = {
  mutate: any;
  onClose: () => void;
};

const DeleteAddress: React.FC<DeleteAddressType> = ({ mutate, onClose }) => {
  return (
    <section>
      <ModalHeader name="Delete" onClose={onClose} />

      <div className={styles["delete-modal"]}>
        <h2>Are you sure you want to delete this Address</h2>

        <div className={styles["delete-action"]}>
          <button onClick={onClose}>Cancel</button>
          <button style={{ color: "red" }} onClick={mutate}>
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteAddress;
