import styles from "./Order.module.scss";
import { Order } from "../../interfaces/interface";
import React from "react";
import ModalHeader from "../Modal/ModalHeader";
import { dateFormate, nikeLogo } from "../../utils/data";

type OrderModalType = {
  orderDetails: Order;
  setOrderDetails: React.Dispatch<React.SetStateAction<Order | null>>;
};

const OrderModal: React.FC<OrderModalType> = ({
  orderDetails,
  setOrderDetails,
}) => {
  const date = new Date(orderDetails.createdAt);
  const nextWeekDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  const today = new Date();
  const status = today > nextWeekDate ? "Delivered" : "On the way";

  return (
    <section className={styles["order-modal"]}>
      <ModalHeader name="Order Details" onClose={() => setOrderDetails(null)} />

      <div className={styles["order-modal-wrap"]}>
        <div className={styles["order-item"]}>
          {orderDetails?.order.map((item) => (
            <div key={item} className={styles["order-item-details"]}>
              <img src={nikeLogo} alt="product" />
              <div>
                <p>Nike Product</p>
                <span>x3</span>
              </div>
            </div>
          ))}
        </div>

        <hr />
        <div className={styles["order-amount"]}>
          <p>
            Shipping and Handling :{" "}
            <span>₹{((orderDetails?.amount * 2) / 100).toFixed(2)}</span>{" "}
          </p>
          <b>
            Total :<span>₹{orderDetails?.amount.toFixed(2)}</span>
          </b>
        </div>
        <hr />

        <div style={{ marginTop: "1rem" }}>
          <p>
            Order Id : <span>{orderDetails._id}</span>
          </p>
          <p>
            Payment Id : <span>{orderDetails.payment.paymentId}</span>
          </p>
        </div>

        <div className={styles["com-details"]}>
          <h3>Delivery Details</h3>

          <p>
            Address :{" "}
            <span>
              {orderDetails.address.address} {orderDetails.address.landmark}
            </span>
          </p>
          <p>
            City : <span>{orderDetails.address.city}</span>{" "}
          </p>
          <p>
            State :{" "}
            <span>
              {orderDetails.address.state} {orderDetails.address.postalCode}
            </span>
          </p>
          <p>
            Status :{" "}
            <span
              className={!status ? styles["delivered"] : styles["one-the-way"]}
            >
              {status}
            </span>
          </p>

          <p style={{ marginTop: "10px", fontWeight: "700" }}>
            {dateFormate(orderDetails.createdAt)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrderModal;
