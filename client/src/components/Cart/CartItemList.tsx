import styles from "./Cart.module.scss";
import CartAction from "./CartAction";
import { Cart } from "../../interfaces/interface";
import React from "react";
import CartModify from "./CartModify";

type CartItemListType = {
  cartData: Cart[];
  handleDelete: (e: string) => void;
};

const CartItemList: React.FC<CartItemListType> = ({
  cartData,
  handleDelete,
}) => {
  return (
    <section className={styles["cart-item"]}>
      <h2>Bag</h2>
      <div className={styles["cart-item-list"]}>
        {cartData?.map((item) => (
          <div className={styles["cart-item-sub"]} key={item.productId}>
            <div className={styles["cart-card"]}>
              <div className={styles["cart-details"]}>
                <div>
                  <img src={item.productImage} alt={item.productName} />
                </div>
                <div className={styles["cart-item-details"]}>
                  <h3>{item.productName}</h3>
                  <p>
                    {item.productType} {item.productCategory}
                  </p>
                  <p>{item.productColor}</p>
                  <CartModify item={item} />
                  <CartAction cartItem={item} handleDelete={handleDelete} />
                </div>
              </div>

              <b>${item.productPrice}</b>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CartItemList;
