import React from "react";
import { Order } from "../../interfaces/interface";
import { nikeLogo } from "../../utils/data";
import { dateFormate } from "../../utils/data";
import styles from "./Order.module.scss";

type OrderListType = {
  order: Order;
  setOrderDetails: React.Dispatch<React.SetStateAction<Order | null>>;
};

const OrderList: React.FC<OrderListType> = React.memo(
  ({ order, setOrderDetails }) => {
    const date = new Date(order.createdAt);
    const nextWeekDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);

    const today = new Date();
    const status = today > nextWeekDate ? "Delivered" : "On the way";

    return (
      <div className={styles["order-card"]}>
        <img src={order.order[0].image} alt="order" />
        <div className={styles["orders-details"]}>
          <p>Amount: {order.amount} </p>
          <p>Shop Date: {dateFormate(order.createdAt)} </p>
          <p>
            Status :{" "}
            <span
              className={!status ? styles["delivered"] : styles["one-the-way"]}
            >
              {status}
            </span>
          </p>

          <button onClick={() => setOrderDetails(order)}>View Details</button>
        </div>
      </div>
    );
  }
);

export default OrderList;
