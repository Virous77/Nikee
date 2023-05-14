import styles from "./Cart.module.scss";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import { Cart } from "../../interfaces/interface";
import { getLocalDataArray } from "../../utils/data";
import useCart from "../../hooks/useCart";
import { useGlobalContext } from "../../store/GlobalContext";

const CartMain = () => {
  const data: Cart[] = getLocalDataArray("nikeCart");
  const { cartData, setCart } = useCart(data);
  const { state, setState } = useGlobalContext();

  const handleDelete = (id: string) => {
    const filterCart = data.filter((product) => product.productId !== id);
    const Total = filterCart
      .map((item) => item.quantity)
      .reduce((acc, curr) => acc + curr, 0);
    setState({ ...state, total: Total });
    setCart(filterCart);
    if (filterCart.length > 0) {
      localStorage.setItem("nikeCart", JSON.stringify(filterCart));
    } else {
      localStorage.removeItem("nikeCart");
    }
  };

  console.log(state.total);

  return (
    <main className={styles["cart"]}>
      <div className={styles["cart-wrapper"]}>
        <CartItemList cartData={cartData} handleDelete={handleDelete} />
        <CartSummary cartData={cartData} />
      </div>
    </main>
  );
};

export default CartMain;
