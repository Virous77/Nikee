import React from "react";
import logo from "../../assets/logo.svg";
import styles from "./NotFound.module.scss";

type NotFoundType = {
  image?: string;
  message: string;
};

const NotFound: React.FC<NotFoundType> = ({ image, message }) => {
  return (
    <div className={styles["not-found"]}>
      <img src={image ? image : logo} alt="not-found" />
      <p>{message}</p>
    </div>
  );
};

export default NotFound;
