import React, { useState } from "react";
import styles from "./Sneakers.module.scss";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

type MobileSneakerType = {
  image: string[] | undefined;
};

const MobileSneaker: React.FC<MobileSneakerType> = ({ image }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleImage = (type: string) => {
    if (type === "right") {
      setCurrentImage(
        currentImage === (image && image?.length - 1) ? 0 : currentImage + 1
      );
    } else {
      if (!image) return;
      setCurrentImage(
        currentImage === 0 ? image?.length - 1 : currentImage - 1
      );
    }
  };

  return (
    <div className={styles["mobileSneaker"]}>
      {image?.map((img, idx) => (
        <div className={styles["sub-image"]} key={idx}>
          {currentImage === idx && <img src={img} alt="sneaker" />}
        </div>
      ))}

      <div className={styles["arrow"]}>
        <BsArrowLeft
          cursor="pointer"
          onClick={() => handleImage("left")}
          size={22}
        />

        <BsArrowRight
          cursor="pointer"
          onClick={() => handleImage("right")}
          size={22}
        />
      </div>
    </div>
  );
};

export default MobileSneaker;
