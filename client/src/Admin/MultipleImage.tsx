import React from "react";
import { Image } from "./AddProductForm";
import { FaCameraRetro } from "react-icons/fa";
import styles from "./Admin.module.scss";
import { AiOutlineDelete } from "react-icons/ai";

type MultipleImageType = {
  image: Image;
  setImage: React.Dispatch<React.SetStateAction<Image>>;
};

const MultipleImage: React.FC<MultipleImageType> = ({ image, setImage }) => {
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const tempImage: string[] = [];
    for (let i = 0; i < e.target.files.length; i++) {
      tempImage.push(URL.createObjectURL(e.target.files[i]));
    }
    setImage({ ...image, images: [...image.images, ...tempImage] });
  };

  const handleDeleteImage = (ref: string) => {
    const filterImage = image.images.filter((img) => img !== ref);
    setImage({ ...image, images: filterImage });
  };

  return (
    <div className={styles["image-preview"]}>
      <ul className={styles["image-preview-list"]}>
        {image.images.map((item, idx) => (
          <li key={idx}>
            <img src={item} alt="images" />

            <button
              className={styles["remove"]}
              onClick={() => handleDeleteImage(item)}
            >
              <AiOutlineDelete size={19} />
            </button>
          </li>
        ))}
        <div className={styles["select-image"]}>
          <label htmlFor="images">
            <FaCameraRetro cursor="pointer" size={22} />
          </label>
          <input
            type="file"
            id="images"
            style={{ display: "none" }}
            onChange={handleImage}
            multiple={true}
          />
        </div>
      </ul>
    </div>
  );
};

export default MultipleImage;
