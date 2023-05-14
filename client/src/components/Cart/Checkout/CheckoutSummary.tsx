import styles from "./Checkout.module.scss";
import PriceSummaryCard from "../PriceSummaryCard";
import CheckoutProductList from "./CheckoutProductList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import useCart from "../../../hooks/useCart";
import { Cart } from "../../../interfaces/interface";
import { getLocalDataArray } from "../../../utils/data";

const CheckoutSummary = () => {
  const navigate = useNavigate();
  const [showCartItem, setShowCartItem] = useState(false);
  const data: Cart[] = getLocalDataArray("nikeCart");
  const { cartData } = useCart(data);

  return (
    <section className={styles["checkout-summary"]}>
      <div className={styles["checkout-summary-head"]}>
        <h2>In Your Bag</h2>
        <span onClick={() => navigate("/cart")}>Edit</span>
        <div className={styles["m-checkout"]}>
          {showCartItem ? (
            <MdOutlineKeyboardArrowUp
              size={22}
              cursor="pointer"
              onClick={() => setShowCartItem(false)}
            />
          ) : (
            <MdOutlineKeyboardArrowDown
              size={22}
              cursor="pointer"
              onClick={() => setShowCartItem(true)}
            />
          )}
        </div>
      </div>

      <div className={styles["checkout-wrapper"]}>
        <div className={showCartItem ? styles["showItem"] : styles["hideItem"]}>
          <PriceSummaryCard cartData={cartData} />
        </div>

        <div className={showCartItem ? styles["showItem"] : styles["hideItem"]}>
          <CheckoutProductList />
        </div>
      </div>
    </section>
  );
};

export default CheckoutSummary;
