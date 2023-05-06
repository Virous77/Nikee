import styles from "./Payment.module.scss";
import box from "../../assets/done.svg";
import { usePayment } from "../../store/paymentContext";

const Payment = () => {
  const { orderData } = usePayment();

  return (
    <main className={styles["payment"]}>
      <div className={styles["payment-done"]}>
        <h1>Thank you to shopping with Nike.</h1>
        <div>
          <img src={box} alt="shopping-box" />
        </div>

        <div className={styles["payment-details"]}>
          <div className={styles["payment-id"]}>
            <p>
              Order Id : <span>{orderData?._id}</span>
            </p>
            <p>
              Amount : <span>${orderData?.amount}</span>{" "}
            </p>

            <p>Arriving at home by </p>
          </div>
          <div className={styles["payment-address"]}></div>
        </div>
        <button>Go to Orders</button>
      </div>
    </main>
  );
};

export default Payment;
