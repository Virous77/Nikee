import styles from "./Profile.module.scss";
import ProfileMenu from "./ProfileMenu";
import ProfileContent from "./ProfileContent";

const Profile = () => {
  return (
    <main className={styles.profile}>
      <div className={styles["profile-wrap"]}>
        <ProfileMenu />
        <ProfileContent />
      </div>
    </main>
  );
};

export default Profile;
