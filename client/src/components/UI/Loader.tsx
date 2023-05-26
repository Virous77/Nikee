import { TbLoader } from "react-icons/tb";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <TbLoader className={styles.loaderIcon} />
    </div>
  );
};

export default Loader;
