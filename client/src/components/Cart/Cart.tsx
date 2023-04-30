import styles from "./Cart.module.scss";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";

const Cart = () => {
  return (
    <main className={styles["cart"]}>
      <div className={styles["cart-wrapper"]}>
        <CartItemList />
        <CartSummary />
      </div>
    </main>
  );
};

export default Cart;
