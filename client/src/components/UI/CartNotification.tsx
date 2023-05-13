import styles from "./Cart.module.scss";
import { BsPatchCheckFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../store/GlobalContext";

const CartNotification = () => {
  const navigate = useNavigate();
  const { state, setState } = useGlobalContext();

  return (
    <>
      <div
        className={`${styles["overlay"]}  ${
          state.cart ? styles["success"] : ""
        }`}
      />
      <aside
        className={`${styles["cart-not"]} ${
          state.cart ? styles["success"] : ""
        } `}
      >
        <header>
          <p>
            <BsPatchCheckFill color="green" />
            Added to Bag
          </p>

          <span>
            <AiOutlineClose
              cursor="pointer"
              size={19}
              onClick={() => setState({ ...state, cart: undefined })}
            />
          </span>
        </header>

        <div className={styles["cart-content"]}>
          <img src={state.cart?.productImage} alt={state.cart?.productName} />
          <div>
            <h2>{state.cart?.productName}</h2>
            <p>
              {state.cart?.productCategory}'s {state.cart?.productType}
            </p>

            <p>Size : {state.cart?.selectSize}</p>
            {state.cart && (
              <p>Price : ${state.cart?.quantity * state.cart?.productPrice}</p>
            )}
          </div>
        </div>

        <div className={styles["cart-noto-action"]}>
          <button
            onClick={() => {
              navigate("/cart");
              setState({ ...state, cart: undefined });
            }}
          >
            View Bag ({state.cart?.quantity})
          </button>
          <button
            onClick={() => {
              navigate("/checkout");
              setState({ ...state, cart: undefined });
            }}
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
};

export default CartNotification;
