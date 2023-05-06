import styles from "./Payment.module.scss";
import box from "../../assets/done.svg";
import { usePayment } from "../../store/paymentContext";
import { dateFormate } from "../../utils/data";

const Payment = () => {
  const { orderData } = usePayment();

  const date = orderData?.createdAt
    ? new Date(orderData?.createdAt)
    : new Date();
  const nextWeekDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  return (
    <main className={styles["payment"]}>
      <div className={styles["payment-done"]}>
        <h1>Thank you to shopping with Nike.</h1>
        <div>
          <img src={box} alt="shopping-box" />
        </div>

        <h2>Delivery Details</h2>
        <div className={styles["payment-details"]}>
          <div className={styles["payment-id"]}>
            <p>
              Order Id : <span>{orderData?._id}</span>
            </p>
            <p>
              Amount : <span>${orderData?.amount}</span>{" "}
            </p>

            <p>Arriving at your home by {dateFormate(nextWeekDate)}.</p>
          </div>
          <div className={styles["payment-address"]}>
            <p>
              Address:{" "}
              <span>
                {orderData?.address.address}, {orderData?.address.landmark}
              </span>
            </p>
            <p>
              City: <span>{orderData?.address.city}</span>
            </p>
            <p>
              State:{" "}
              <span>
                {orderData?.address.state}, {orderData?.address.postalCode}
              </span>
            </p>
          </div>
        </div>
        <button>Go to My Orders</button>
      </div>
    </main>
  );
};

export default Payment;
