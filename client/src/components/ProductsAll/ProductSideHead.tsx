import React from "react";
import styles from "./Products.module.scss";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

type ProductSideHeadType = {
  show: string;
  name: string;
  activeCase: string;
  onClose: () => void;
  onClick: () => void;
};

const ProductSideHead: React.FC<ProductSideHeadType> = ({
  show,
  name,
  activeCase,
  onClose,
  onClick,
}) => {
  return (
    <div className={styles["shop-head"]}>
      <span>{name}</span>

      <p>
        {show === activeCase ? (
          <MdOutlineKeyboardArrowDown onClick={onClose} />
        ) : (
          <MdOutlineKeyboardArrowUp onClick={onClick} />
        )}
      </p>
    </div>
  );
};

export default ProductSideHead;
