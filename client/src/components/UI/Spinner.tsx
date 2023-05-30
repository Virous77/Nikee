import { ImSpinner9 } from "react-icons/im";
import styles from "./Loader.module.scss";

const Spinner = () => {
  return (
    <div className={styles.Spinner}>
      <ImSpinner9 className={styles.spinnerIcon} />
    </div>
  );
};

export default Spinner;
