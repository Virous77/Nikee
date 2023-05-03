import styles from "./Profile.module.scss";
import { useAuthContext } from "../../store/authContext";
import logo from "../../assets/asset10.jpeg";

const Profile = () => {
  const { UserData } = useAuthContext();

  return (
    <main className={styles.profile}>
      <div className={styles["profile-wrap"]}>
        <h2>Profile</h2>

        <div className={styles["profile-card"]}></div>
      </div>
    </main>
  );
};

export default Profile;
