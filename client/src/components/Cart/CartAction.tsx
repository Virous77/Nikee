import styles from "./Cart.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineHeart } from "react-icons/hi";
import { Cart } from "../../interfaces/interface";
import React from "react";

type CartActionType = {
  cartItem: Cart;
  handleDelete: (e: string) => void;
};

const CartAction: React.FC<CartActionType> = ({ cartItem, handleDelete }) => {
  return (
    <div className={styles["cart-action"]}>
      <HiOutlineHeart size={22} cursor="pointer" />
      <RiDeleteBin6Line
        size={20}
        cursor="pointer"
        onClick={() => handleDelete(cartItem.productId)}
      />
    </div>
  );
};

export default CartAction;
