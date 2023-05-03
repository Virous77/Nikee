import styles from "./Profile.module.scss";
import { useAuthContext } from "../../store/authContext";
import logo from "../../assets/asset11.jpeg";

const Account = () => {
  const { UserData } = useAuthContext();
  return (
    <section className={styles.account}>
      <div className={styles["account-wrap"]}>
        <div className={styles["account-user"]}>
          <img src={UserData?.image || logo} alt={UserData?.name} />
        </div>

        <div className={styles["account-details"]}>
          <h2>{UserData?.name}</h2>
          <p>{UserData?.email}</p>
          <p>{UserData?.birth}</p>
          <span>{UserData?.about}</span>
          <span>{UserData?.country}</span>
        </div>
      </div>
    </section>
  );
};

export default Account;
