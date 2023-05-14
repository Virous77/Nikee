import styles from "./Cart.module.scss";
import { useNavigate } from "react-router-dom";
import emptyCart from "../../assets/cartEmpty.svg";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <section className={styles["cart-empty"]}>
      <div className={styles["cart-wrap"]}>
        <img src={emptyCart} alt="empty-cart" />
        <p>Your cart is empty.</p>
        <button onClick={() => navigate("/")}>Go to Browse</button>
      </div>
    </section>
  );
};

export default EmptyCart;
