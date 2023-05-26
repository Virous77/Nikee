import styles from "./Layout.module.scss";
import { BsHandbag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

const CartButton = () => {
  const navigate = useNavigate();
  const { Total } = useCart();

  return (
    <div className={styles["cart-button"]}>
      <button>
        <BsHandbag
          size={19}
          cursor="pointer"
          onClick={() => navigate("/cart")}
        />
      </button>
      <p>{Total && Total}</p>
    </div>
  );
};

export default CartButton;
