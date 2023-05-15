import styles from "./Checkout.module.scss";
import logo from "../../../assets/logo.svg";
import { BsHandbag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";

const CheckoutHead = () => {
  const navigate = useNavigate();
  const { Total } = useCart();

  return (
    <header className={styles["checkout-header"]}>
      <img src={logo} alt="nike" onClick={() => navigate("/")} />

      <div className={styles["checkout-cart"]}>
        <BsHandbag
          size={22}
          cursor="pointer"
          onClick={() => navigate("/cart")}
        />
        <p>{Total}</p>
      </div>
    </header>
  );
};

export default CheckoutHead;
