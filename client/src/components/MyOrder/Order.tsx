import styles from "./Order.module.scss";
import { getData } from "../../api/api";
import { useQuery } from "react-query";
import { getLocalData } from "../../utils/data";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError, Order } from "../../interfaces/interface";
import OrderList from "./OrderList";
import { Modal } from "../Modal/Modal";
import { useState } from "react";
import OrderModal from "./OrderModal";

const OrderPage = () => {
  const userId = getLocalData("nike");
  const { handleSetNotification } = useGlobalContext();
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);

  const { data: orders } = useQuery(
    ["orders"],
    async () => {
      const data: Order[] = await getData(`/order/user/${userId}`);
      return data;
    },
    {
      onError: (response: AppError) => {
        handleSetNotification({
          message: response.data.message,
          status: "error",
        });
      },
      retry: false,
    }
  );

  return (
    <main className={styles.orders}>
      <div className={styles["orders-list"]}>
        {orders?.map((order) => (
          <OrderList
            key={order._id}
            order={order}
            setOrderDetails={setOrderDetails}
          />
        ))}
      </div>

      {orderDetails && (
        <Modal isOpen="isOpen" onClose={() => setOrderDetails(null)}>
          <OrderModal
            orderDetails={orderDetails}
            setOrderDetails={setOrderDetails}
          />
        </Modal>
      )}
    </main>
  );
};

export default OrderPage;