import styles from "./Cart.module.scss";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PriceSummaryCard from "./PriceSummaryCard";
import { Cart } from "../../interfaces/interface";
import useCoupons from "../../hooks/useCoupons";
import { useGlobalContext } from "../../store/GlobalContext";

type CartSummaryType = {
  cartData: Cart[];
};

const CartSummary: React.FC<CartSummaryType> = ({ cartData }) => {
  const [discount, setDiscount] = useState(0);
  const couponRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { setShow, show, coupons } = useCoupons();
  const { handleSetNotification } = useGlobalContext();

  const handleDiscount = () => {
    const findLegit = coupons?.find(
      (coupon) => coupon.coupon === couponRef.current?.value
    );

    if (findLegit) {
      localStorage.setItem("coupon", JSON.stringify(findLegit.discountPercent));
      setDiscount(findLegit.discountPercent);
    } else {
      handleSetNotification({
        message: "Coupons not exists anymore",
        status: "error",
      });
    }
  };

  return (
    <section className={styles["order-summary"]}>
      <h2>Summary</h2>

      <div className={styles["order-card"]}>
        <div className={styles["promo"]}>
          <div className={styles["promo-active"]}>
            <h4>Do you have a Promo Code?</h4>
            {!show ? (
              <MdOutlineKeyboardArrowUp
                onClick={() => setShow(true)}
                size={22}
                cursor="pointer"
              />
            ) : (
              <MdOutlineKeyboardArrowDown
                onClick={() => setShow(false)}
                size={22}
                cursor="pointer"
              />
            )}
          </div>

          <div className={show ? styles["show-promo"] : styles["hide-promo"]}>
            <input type="text" placeholder="Enter Promo Code" ref={couponRef} />
            <button onClick={handleDiscount}>Apply</button>
          </div>
        </div>
        <PriceSummaryCard
          show="active"
          cartData={cartData}
          discount={discount}
        />
        <div className={styles["cart-checkout"]}>
          <button
            className={styles["checkout-button"]}
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartSummary;
