import { useRef } from "react";
import styles from "./Admin.module.scss";
import useCoupons from "../hooks/useCoupons";
import { useGlobalContext } from "../store/GlobalContext";
import { getLocalData } from "../utils/data";

const Coupon = () => {
  const validTillRef = useRef<HTMLInputElement | null>(null);
  const validFromRef = useRef<HTMLInputElement | null>(null);
  const couponRef = useRef<HTMLInputElement | null>(null);
  const discountRef = useRef<HTMLInputElement | null>(null);

  const { mutate, isLoading } = useCoupons();
  const { handleSetNotification } = useGlobalContext();
  const userId = getLocalData("nike");

  const handleCreateCoupon = () => {
    if (
      !validFromRef.current?.value ||
      !couponRef.current?.value ||
      !validTillRef.current?.value ||
      !discountRef.current?.value
    )
      return handleSetNotification({
        message: "All fields are compulsory",
        status: "error",
      });

    const data = {
      coupon: couponRef.current.value,
      validFrom: validFromRef.current.value,
      validTill: validTillRef.current.value,
      discountPercent: discountRef.current.value,
      userId,
    };
    mutate(data);
  };

  return (
    <main className={styles["coupon"]}>
      <div className={styles["coupon-wrap"]}>
        <fieldset>
          <input type="text" placeholder="Coupon name" ref={couponRef} />
        </fieldset>

        <fieldset>
          <input type="text" placeholder="Discount percent" ref={discountRef} />
        </fieldset>

        <div>
          <fieldset>
            <input type="date" placeholder="Active Date" ref={validFromRef} />
          </fieldset>

          <fieldset>
            <input type="date" placeholder="Expired Date" ref={validTillRef} />
          </fieldset>
        </div>

        <div>
          <button onClick={handleCreateCoupon} disabled={isLoading}>
            {isLoading ? "Adding.." : "Create Coupon"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Coupon;
