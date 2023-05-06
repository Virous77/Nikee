import styles from "./Order.module.scss";
import { Order } from "../../interfaces/interface";
import React from "react";
import ModalHeader from "../Modal/ModalHeader";

type OrderModalType = {
  orderDetails: Order | undefined;
};

const OrderModal: React.FC<OrderModalType> = ({ orderDetails }) => {
  return <section className={styles["order-modal"]}>OrderModal</section>;
};

export default OrderModal;
