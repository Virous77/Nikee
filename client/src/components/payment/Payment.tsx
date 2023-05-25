import styles from "./Payment.module.scss";
import box from "../../assets/done.svg";
import { dateFormate, getNextDate } from "../../utils/data";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError } from "../../interfaces/interface";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../store/authContext";
import useCart from "../../hooks/useCart";
import { getLocalData } from "../../utils/data";

const Payment = () => {
  const navigate = useNavigate();
  const { UserData } = useAuthContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");
  const { handleSetNotification } = useGlobalContext();
  const makeUserName = UserData?.name.split(" ").join("-");
  const { deleteMultipleMutate } = useCart();
  const userId = getLocalData("nike");

  const {
    data: orderData,
    isLoading,
    refetch,
  } = useQuery(
    ["orderDone"],
    async () => {
      const data = await getData(`/order/${orderId}`);
      deleteMultipleMutate(userId);
      localStorage.removeItem("cartId");
      localStorage.removeItem("checkout");
      localStorage.removeItem("coupon");
      return data;
    },

    {
      onError: (response: AppError) => {
        handleSetNotification({
          message: response.data.message,
          status: "error",
        });
      },

      retry: true,
    }
  );

  const date = getNextDate(orderData?.createdAt);

  useEffect(() => {
    refetch();
  }, [orderId, refetch]);

  if (isLoading) return <p>Loading...</p>;

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

            <p>Arriving at your home by {dateFormate(date)}.</p>
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
        <button onClick={() => navigate(`/profile/orders/${makeUserName}`)}>
          Go to My Orders
        </button>
      </div>
    </main>
  );
};

export default Payment;
