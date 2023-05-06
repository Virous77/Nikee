import { createContext, useContext } from "react";
import { getLocalData } from "../utils/data";
import { useAuthContext } from "./authContext";
import { nikeLogo } from "../utils/data";
import { createData } from "../api/api";
import { UserAddress, Order, AppError } from "../interfaces/interface";
import { getData } from "../api/api";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";
import { useQuery } from "react-query";

type PaymentContextType = {
  handlePayment: () => void;
  isLoading: boolean;
  orderData: Order | undefined;
};

const initialValue = {
  handlePayment: () => {},
  isLoading: false,
  orderData: {} as Order,
};

const PaymentContext = createContext<PaymentContextType>(initialValue);

export const PaymentContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const id = getLocalData("nike");
  const address: UserAddress = getLocalData("checkout");
  const { UserData } = useAuthContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");
  const { handleSetNotification } = useGlobalContext();

  const handlePayment = async () => {
    const checkoutData = {
      amount: 400,
      userId: id,
      address: {
        address: address.address,
        landmark: address.landmark,
        postalCode: address.postalCode,
        state: address.state,
        city: address.city,
        addressType: address.addressType,
      },
      order: [
        "644cdcdad754b8cbc94391f6",
        "644cdcdad754b8cbc94391f6",
        "644cdcdad754b8cbc94391f6",
      ],
    };
    const data = await createData({
      endpoints: "/checkout",
      userData: checkoutData,
    });

    const options = {
      key: import.meta.env.VITE_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "Nike",
      description: "Transaction for shopping with Nike.",
      image: nikeLogo,
      order_id: data.id,
      callback_url: `${import.meta.env.VITE_URL}/paymentverification`,
      prefill: {
        name: UserData?.name,
        email: UserData?.email,
      },
      theme: {
        color: "black",
      },
    };

    // @ts-ignore
    const razor = new window.Razorpay(options);
    razor.open();
  };

  const { data: orderData, isLoading } = useQuery(
    ["orderDone"],
    async () => {
      if (location.pathname.includes("payment-complete")) {
        const data = await getData(`/order/${orderId}`);
        return data;
      }
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
    <PaymentContext.Provider value={{ handlePayment, isLoading, orderData }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
export default PaymentContext;
