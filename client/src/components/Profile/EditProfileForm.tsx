import styles from "./Profile.module.scss";
import ProfileImage from "./ProfileImage";
import { useAuthContext } from "../../store/authContext";

const EditProfileForm = () => {
  const {
    userEditData,
    setUserEditData,
    handleUserProfileUpdate,
    updateLoading,
  } = useAuthContext();

  return (
    <div className={styles["edit-profile-form"]}>
      <ProfileImage
        image={
          userEditData?.image ||
          "https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1"
        }
      />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles["flat-profile-form"]}>
          <fieldset>
            <input
              type="text"
              placeholder="Full Name"
              value={userEditData?.name}
              onChange={(e) => {
                if (userEditData) {
                  setUserEditData({ ...userEditData, name: e.target.value });
                }
              }}
            />
          </fieldset>

          <fieldset>
            <input
              type="text"
              placeholder="Email"
              value={userEditData?.email}
              onChange={(e) => {
                if (userEditData) {
                  setUserEditData({ ...userEditData, email: e.target.value });
                }
              }}
            />
          </fieldset>
        </div>
        <fieldset>
          <input
            type="text"
            placeholder="About"
            value={userEditData?.about}
            onChange={(e) => {
              if (userEditData) {
                setUserEditData({ ...userEditData, about: e.target.value });
              }
            }}
          />
        </fieldset>

        <div className={styles["profile-button"]}>
          <button onClick={handleUserProfileUpdate}>
            {updateLoading ? "Processing.." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
