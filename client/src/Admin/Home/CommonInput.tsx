import React from "react";
import SingleImage from "./SingleImage";
import styles from "./Home.module.scss";

type CommonInputType = {
  images: string;
  uploadImage: (e: string) => void;
  setImage: (e: string) => void;
  title: string;
  titleValue: string;
  onTitle: (e: string) => void;
  descValue: string;
  onDesc: (e: string) => void;
};

const CommonInput: React.FC<CommonInputType> = ({
  images,
  uploadImage,
  setImage,
  title,
  onTitle,
  titleValue,
  onDesc,
  descValue,
}) => {
  return (
    <div className={styles.common}>
      <h2>{title}</h2>

      <div className={styles["common-main"]}>
        <div className={styles["common-flat"]}>
          <fieldset>
            <input
              type="text"
              placeholder="Title"
              value={titleValue}
              onChange={(e) => onTitle(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <input
              type="text"
              placeholder="Description"
              value={descValue}
              onChange={(e) => onDesc(e.target.value)}
            />
          </fieldset>
        </div>
        <SingleImage
          image={images}
          uploadedImage={(e: string) => uploadImage(e)}
          setImage={(e: string) => setImage(e)}
          title={title}
        />
      </div>
    </div>
  );
};

export default CommonInput;
