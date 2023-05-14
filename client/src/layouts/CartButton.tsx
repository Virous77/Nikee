import styles from "./Layout.module.scss";
import { BsHandbag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getLocalDataArray } from "../utils/data";
import { Cart } from "../interfaces/interface";
import { useGlobalContext } from "../store/GlobalContext";

const CartButton = () => {
  const navigate = useNavigate();
  const cart: Cart[] = getLocalDataArray("nikeCart");
  const { state } = useGlobalContext();

  const Total = cart
    .map((item) => item.quantity)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <div className={styles["cart-button"]}>
      <button>
        <BsHandbag
          size={19}
          cursor="pointer"
          onClick={() => navigate("/cart")}
        />
      </button>
      <p>{state.total ? state.total : Total}</p>
    </div>
  );
};

export default CartButton;
