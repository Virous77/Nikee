import styles from "./Cart.module.scss";
import { cartItem } from "../../utils/data";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineHeart } from "react-icons/hi";

const CartItemList = () => {
  return (
    <section className={styles["cart-item"]}>
      <h2>Bag</h2>
      <div className={styles["cart-item-list"]}>
        {cartItem.map((item) => (
          <div className={styles["cart-item-sub"]} key={item.id}>
            <div className={styles["cart-card"]}>
              <div className={styles["cart-details"]}>
                <div>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={styles["cart-item-details"]}>
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <p>{item.color}</p>
                  <div className={styles["item-size"]}>
                    <p>Size {item.Size}</p>
                    <p>Quantity {item.Quantity}</p>
                  </div>
                  <div className={styles["cart-action"]}>
                    <HiOutlineHeart size={22} cursor="pointer" />
                    <RiDeleteBin6Line size={20} cursor="pointer" />
                  </div>
                </div>
              </div>

              <b>${item.price}</b>
            </div>

            <div className={styles["cart-pin"]}>
              <p>Arrives by Mon, May 8 to </p>
              <b>Edit Location</b>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CartItemList;
