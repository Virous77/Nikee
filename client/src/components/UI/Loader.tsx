import { TbLoader } from "react-icons/tb";
import styles from "./Loader.module.scss";
import React from "react";

type LoaderType = {
  message?: string;
};

const Loader: React.FC<LoaderType> = ({ message }) => {
  return (
    <div className={styles.Loader}>
      <TbLoader className={styles.loaderIcon} />
      {message && <p>Wait for 30 seconds if you're first time. Loading...</p>}
    </div>
  );
};

export default Loader;
