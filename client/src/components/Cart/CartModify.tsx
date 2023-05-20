import React from "react";
import { Cart } from "../../interfaces/interface";
import styles from "./Cart.module.scss";
import useCart from "../../hooks/useCart";

type CartModifyType = {
  item: Cart;
};

type sizeType = {
  item: Cart;
  currentSize?: string;
  currentQuantity?: number;
};

const CartModify: React.FC<CartModifyType> = ({ item }) => {
  const { updateMutate } = useCart();

  const handleUpdateSize = ({
    item,
    currentSize,
    currentQuantity,
  }: sizeType) => {
    if (!currentQuantity) {
      if (!currentSize) return;
      const { size, _id, ...restData } = item;

      const updateData = {
        ...restData,
        size: currentSize,
      };

      updateMutate({ updateData, id: _id });
    } else {
      if (!currentQuantity) return;
      const { quantity, _id, ...restData } = item;

      const updateData = {
        ...restData,
        quantity: currentQuantity,
      };
      updateMutate({ updateData, id: _id });
    }
    localStorage.removeItem("cartId");
  };

  return (
    <div className={styles["item-size"]}>
      <div className={styles["flat-select"]}>
        <p>Size : </p>
        <select
          value={item.size}
          onChange={(e) => {
            handleUpdateSize({ item: item, currentSize: e.target.value });
          }}
        >
          {item.selectSize.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className={styles["flat-select"]}>
        <p>Quantity : </p>
        <select
          value={item.quantity}
          onChange={(e) => {
            handleUpdateSize({ item: item, currentQuantity: +e.target.value });
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CartModify;
