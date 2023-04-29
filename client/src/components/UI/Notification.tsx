import styles from "./Notification.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useGlobalContext } from "../../store/GlobalContext";

const Notification = () => {
  const { notification, handleSetNotification } = useGlobalContext();

  return (
    <div
      className={`${styles["notification"]}  ${
        notification.status === "success"
          ? styles["success"]
          : notification.status === "error"
          ? styles["error"]
          : ""
      }  `}
    >
      {notification.message}{" "}
      <AiOutlineClose
        size={16}
        cursor="pointer"
        onClick={() => handleSetNotification({ status: "", message: "" })}
      />
    </div>
  );
};

export default Notification;
