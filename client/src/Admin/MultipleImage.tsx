import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import styles from "./Admin.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { ProductDetailsType } from "../types/type";
import { AppError } from "../interfaces/interface";
import { useGlobalContext } from "../store/GlobalContext";
import { useMutation } from "react-query";
import { createData } from "../api/api";
import { getLocalData } from "../utils/data";

type MultipleImageType = {
  productDetails: ProductDetailsType;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetailsType>>;
  isDelete?: string;
};

type deleteType = {
  id: string;
  link: string;
};

const MultipleImage: React.FC<MultipleImageType> = ({
  productDetails,
  setProductDetails,
  isDelete,
}) => {
  const { images, imagesR } = productDetails;
  const { handleSetNotification } = useGlobalContext();
  const userId = getLocalData("nike");

  const { mutate, isLoading } = useMutation(
    (data: deleteType) => {
      return createData({
        endpoints: `/product/image/${data.id}`,
        userData: { image: data.link },
      });
    },
    {
      onError: ({ data }: AppError) => {
        handleSetNotification({ message: data.message, status: "error" });
      },
    }
  );

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
    if (isDelete === "yes") {
      const data = {
        id: userId,
        link: ref,
      };
      mutate(data);
    }
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
              disabled={isLoading}
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
