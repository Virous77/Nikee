import React from "react";
import { Cart } from "../../interfaces/interface";
import styles from "./Cart.module.scss";
import { HiChevronDown } from "react-icons/hi";

type CartModifyType = {
  item: Cart;
};

type sizeType = {
  id: string;
  size: string;
};

const CartModify: React.FC<CartModifyType> = ({ item }) => {
  //   const handleUpdateSize = ({ id, size }: sizeType) => {
  //     const findItem = cartData.find((item) => item.productId === id);
  //     const filterCart = cartData.filter((item) => item.productId !== id);
  //     findItem && (findItem.size = size);
  //     localStorage.setItem("nikeCart", JSON.stringify([...filterCart, findItem]));

  //     if (!filterCart || !findItem) return;
  //     setState({ ...state, cartData: [findItem, ...filterCart] });
  //   };

  return (
    <div className={styles["item-size"]}>
      <div>
        <p>Size : </p>
        <select value={item.size}>
          {item.selectSize.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <p>
        Quantity : {item.quantity} <HiChevronDown size={22} />{" "}
      </p>
    </div>
  );
};

export default CartModify;
