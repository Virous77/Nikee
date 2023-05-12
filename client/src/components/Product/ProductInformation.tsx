import React, { useState } from "react";
import styles from "./Product.module.scss";
import HtmlParser from "../../common/HtmlParser";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

type ProductInfoType = {
  info: string | undefined;
};

const ProductInformation: React.FC<ProductInfoType> = ({ info }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={`${styles["product-review"]}  ${styles["product-info"]}`}>
      <header>
        <p>Product Information</p>

        {showMore ? (
          <BiChevronUp
            size={23}
            cursor="pointer"
            onClick={() => setShowMore(false)}
          />
        ) : (
          <BiChevronDown
            size={23}
            cursor="pointer"
            onClick={() => setShowMore(true)}
          />
        )}
      </header>

      {showMore && (
        <div style={{ marginTop: "1.5rem" }}>
          <HtmlParser data={info} />
        </div>
      )}
    </div>
  );
};

export default ProductInformation;
