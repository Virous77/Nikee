import React from "react";
import styles from "../Admin.module.scss";
import { FaCameraRetro } from "react-icons/fa";
import { uploadImage } from "../../utils/imageupload";
import style from "./Home.module.scss";
import { useMutation } from "react-query";
import { createData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError } from "../../interfaces/interface";
import { getLocalData } from "../../utils/data";
import { MdOutlineDeleteOutline } from "react-icons/md";

type SingleImageType = {
  title: string;
  image: string;
  setImage: (e: string) => void;
  uploadedImage: (e: string) => void;
};

type deleteType = {
  id: string;
  link: string;
};

const SingleImage: React.FC<SingleImageType> = ({
  title,
  image,
  setImage,
  uploadedImage,
}) => {
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const currentImage = e.target.files[0];
    setImage(URL.createObjectURL(currentImage));
    const result = await uploadImage(currentImage);
    uploadedImage(result);
  };

  const handleDelete = (link: string) => {
    const data = {
      id: userId,
      link: link,
    };
    mutate(data);
    setImage("");
    uploadedImage("");
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

        <button disabled={isLoading}>
          <MdOutlineDeleteOutline onClick={() => handleDelete(image)} />
        </button>
      </div>
    </div>
  );
};

export default SingleImage;
