import styles from "./Profile.module.scss";
import ProfileImage from "./ProfileImage";

const EditProfileForm = () => {
  return (
    <div className={styles["edit-profile-form"]}>
      <ProfileImage image="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1" />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles["flat-profile-form"]}>
          <fieldset>
            <input type="text" placeholder="Full Name" />
          </fieldset>

          <fieldset>
            <input type="text" placeholder="Email" />
          </fieldset>
        </div>
        <fieldset>
          <input type="text" placeholder="About" />
        </fieldset>

        <div className={styles["profile-button"]}>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
