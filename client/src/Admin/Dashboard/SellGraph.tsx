import styles from "./Dashboard.module.scss";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError, Order } from "../../interfaces/interface";

const SellGraph = () => {
  const { handleSetNotification } = useGlobalContext();

  const { data: orders } = useQuery(
    ["order-admin"],
    async () => {
      const data: Order[] = await getData(`/orders`);
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

  return <div className={styles.orders}>SellGraph</div>;
};

export default SellGraph;
