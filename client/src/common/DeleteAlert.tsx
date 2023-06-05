import React from "react";
import styles from "./Delete.module.scss";

type DeleteAlertType = {
  id: string;
  title: string;
  onClick: (e: string) => void;
  onClose: () => void;
};

const DeleteAlert: React.FC<DeleteAlertType> = ({
  id,
  title,
  onClick,
  onClose,
}) => {
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <section className={styles.delete}>
        <p>Are you sure wanna delete this {title}?</p>
        <div className={styles["flat-action"]}>
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => onClick(id)}
            style={{ background: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      </section>
    </>
  );
};

export default DeleteAlert;
