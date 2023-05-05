import React from "react";
import styles from "./Profile.module.scss";
import { FaRegEdit } from "react-icons/fa";
import { useAuthContext } from "../../store/authContext";

type ProfileImageType = {
  image: string;
};

const ProfileImage: React.FC<ProfileImageType> = ({ image }) => {
  const { handleImageUpload } = useAuthContext();
  return (
    <div className={styles["profile-img"]}>
      <img src={image} alt="user" />

      <fieldset>
        <label htmlFor="image">
          <FaRegEdit />
        </label>
        <input
          type="file"
          style={{ display: "none" }}
          id="image"
          onChange={handleImageUpload}
        />
      </fieldset>
    </div>
  );
};

export default ProfileImage;
