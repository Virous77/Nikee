import { useState } from "react";
import { featuredType } from "../../utils/data";
import styles from "./Featured.module.scss";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

type ScrollImageType = {
  id: number;
  name: string;
  image: string;
  type: string;
  category: string;
};

const FeatureScroll = () => {
  const [scrollImage, setScrollImage] = useState<ScrollImageType[]>([
    ...featuredType,
    featuredType[0],
  ]);

  const navigate = useNavigate();

  const handleImage = (type: string) => {
    if (type === "right") {
      const first = scrollImage[1];
      scrollImage.push(first);
      setScrollImage([first, ...scrollImage.slice(2)]);
    } else {
      const first = scrollImage[1];
      scrollImage.push(first);
      setScrollImage([first, ...scrollImage.slice(2)]);
    }
  };

  return (
    <div className={styles["feature-img"]}>
      {scrollImage.map((img, idx) => (
        <div
          key={idx}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`${img.type}/${img.category}`);
          }}
        >
          <img src={img.image} alt={img.name} />
        </div>
      ))}

      <div className={styles["arrow"]}>
        <button className={styles["first"]} onClick={() => handleImage("left")}>
          <BsArrowLeft cursor="pointer" size={22} />
        </button>

        <button
          className={styles["second"]}
          onClick={() => handleImage("right")}
        >
          <BsArrowRight cursor="pointer" size={22} />
        </button>
      </div>
    </div>
  );
};

export default FeatureScroll;
