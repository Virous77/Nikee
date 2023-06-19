import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./Modal.module.scss";

type ModalHeaderType = {
  name: string;
  onClose: () => void;
};

const ModalHeader: React.FC<ModalHeaderType> = ({ name, onClose }) => {
  return (
    <header className={styles["modal-header"]}>
      <h2>{name}</h2>

      <button>
        <AiOutlineClose
          cursor="pointer"
          size={20}
          onClick={onClose}
          color="black"
        />
      </button>
    </header>
  );
};

export default ModalHeader;
