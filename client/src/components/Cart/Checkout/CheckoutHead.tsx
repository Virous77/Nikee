import styles from "./Checkout.module.scss";
import logo from "../../../assets/logo.svg";
import { BsHandbag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const CheckoutHead = () => {
  const navigate = useNavigate();
  return (
    <header className={styles["checkout-header"]}>
      <img src={logo} alt="nike" onClick={() => navigate("/")} />
      <div className={styles["checkout-cart"]}>
        <BsHandbag
          size={22}
          cursor="pointer"
          onClick={() => navigate("/cart")}
        />
      </div>
    </header>
  );
};

export default CheckoutHead;
