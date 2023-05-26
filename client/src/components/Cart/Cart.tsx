import styles from "./Cart.module.scss";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import EmptyCart from "../UI/EmptyCart";
import useCart from "../../hooks/useCart";
import Loader from "../UI/Loader";

const CartMain = () => {
  const { cartData, deleteMutate, cartLoading } = useCart();

  if (cartLoading) return <Loader />;

  return (
    <main className={styles["cart"]}>
      {cartData && cartData.length > 0 ? (
        <div className={styles["cart-wrapper"]}>
          <CartItemList
            cartData={cartData}
            handleDelete={(id) => {
              deleteMutate(id);
              localStorage.removeItem("coupon");
            }}
          />
          <CartSummary />
        </div>
      ) : (
        <EmptyCart />
      )}
    </main>
  );
};

export default CartMain;
