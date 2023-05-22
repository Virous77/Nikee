import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import styles from "./Admin.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { ProductDetailsType } from "../types/type";

type MultipleImageType = {
  productDetails: ProductDetailsType;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetailsType>>;
};

const MultipleImage: React.FC<MultipleImageType> = ({
  productDetails,
  setProductDetails,
}) => {
  const { images, imagesR } = productDetails;

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = e.target.files;
    const tempImage: string[] = [];
    const imageList: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      tempImage.push(URL.createObjectURL(file));

      const fileReader = new FileReader();

      const onload = new Promise((resolve) => {
        fileReader.onload = () => {
          if (typeof fileReader.result === "string") {
            imageList.push(fileReader.result);
            resolve("done");
          }
        };
      });

      fileReader.readAsDataURL(file);
      await onload;
    }

    setProductDetails({
      ...productDetails,
      images: [...images, ...tempImage],
      imagesR: [...imagesR, ...imageList],
    });
  };

  const handleDeleteImage = (ref: string) => {
    const filterImage = images.filter((img) => img !== ref);
    setProductDetails({ ...productDetails, images: filterImage });
  };

  return (
    <div className={styles["image-preview"]}>
      <ul className={styles["image-preview-list"]}>
        {images.map((item, idx) => (
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
