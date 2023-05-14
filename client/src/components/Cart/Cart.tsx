import styles from "./Cart.module.scss";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import EmptyCart from "../UI/EmptyCart";
import useCart from "../../hooks/useCart";

const CartMain = () => {
  const { cartData, deleteMutate } = useCart();

  return (
    <main className={styles["cart"]}>
      {cartData && cartData.length > 0 ? (
        <div className={styles["cart-wrapper"]}>
          <CartItemList
            cartData={cartData}
            handleDelete={(id) => deleteMutate(id)}
          />
          <CartSummary cartData={cartData} />
        </div>
      ) : (
        <EmptyCart />
      )}
    </main>
  );
};

export default CartMain;
