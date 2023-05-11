import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";

type ProductImageType = {
  images: string[];
};

const ProductImage: React.FC<ProductImageType> = ({ images }) => {
  const [heroImg, setHeroImg] = useState(images[0]);

  useEffect(() => {
    setHeroImg(images[0]);
  }, [images]);

  return (
    <section className={styles["product-d-img"]}>
      <ul className={styles["side-img"]}>
        {images.map((img) => (
          <li key={img}>
            <img
              src={img}
              alt="product images"
              onMouseEnter={() => setHeroImg(img)}
              className={heroImg === img ? styles["activeImg"] : ""}
            />
          </li>
        ))}
      </ul>

      <div className={styles["heroImg"]}>
        <img src={heroImg} alt="product img" />
      </div>
    </section>
  );
};

export default ProductImage;
