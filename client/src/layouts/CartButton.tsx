import styles from "./Layout.module.scss";
import { BsHandbag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getLocalData } from "../utils/data";
import { Cart } from "../interfaces/interface";

const CartButton = () => {
  const navigate = useNavigate();
  const cartData: Cart[] | null = getLocalData("nikeCart");

  const cartCount =
    cartData &&
    cartData.map((item) => item.quantity).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className={styles["cart-button"]}>
      <button>
        <BsHandbag
          size={19}
          cursor="pointer"
          onClick={() => navigate("/cart")}
        />
      </button>
      <p>{cartCount}</p>
    </div>
  );
};

export default CartButton;
