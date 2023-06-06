import React from "react";
import styles from "../Admin.module.scss";
import { FaCameraRetro } from "react-icons/fa";
import { uploadImage } from "../../utils/imageupload";
import style from "./Home.module.scss";

type SingleImageType = {
  title: string;
  image: string;
  setImage: (e: string) => void;
  uploadedImage: (e: string) => void;
};

const SingleImage: React.FC<SingleImageType> = ({
  title,
  image,
  setImage,
  uploadedImage,
}) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const currentImage = e.target.files[0];
    setImage(URL.createObjectURL(currentImage));
    const result = await uploadImage(currentImage);
    uploadedImage(result);
  };

  return (
    <div className={`${styles["size-set"]}  ${style.hero} `}>
      <p>{title} Image</p>

      <div className={styles["hero-main"]}>
        {image ? (
          <img src={image} alt="images" />
        ) : (
          <fieldset>
            <label htmlFor="image">
              <FaCameraRetro />
              <p>Hero Image</p>
            </label>
            <input
              type="file"
              id="image"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </fieldset>
        )}
      </div>
    </div>
  );
};

export default SingleImage;
