import { createContext, useContext } from "react";
import { getLocalData, getLocalDataArray } from "../utils/data";
import { useAuthContext } from "./authContext";
import { nikeLogo } from "../utils/data";
import { createData } from "../api/api";
import { UserAddress, Cart } from "../interfaces/interface";
import useCart from "../hooks/useCart";

type PaymentContextType = {
  handlePayment: () => void;
};

const initialValue = {
  handlePayment: () => {},
};

const PaymentContext = createContext<PaymentContextType>(initialValue);

export const PaymentContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const id = getLocalData("nike");
  const address: UserAddress = getLocalData("checkout");
  const cartData: Cart[] = getLocalDataArray("nikeCart");
  const { UserData } = useAuthContext();
  const { totalPrice, totalTax } = useCart();

  const shoppingProduct = cartData?.map((item) => {
    const createData = {
      name: item.productName,
      quantity: item.quantity,
      price: item.productPrice,
      image: item.productImage,
    };

    return createData;
  });

  const handlePayment = async () => {
    const checkoutData = {
      amount: totalPrice && totalTax && totalTax + totalPrice,
      userId: id,
      address: {
        address: address.address,
        landmark: address.landmark,
        postalCode: address.postalCode,
        state: address.state,
        city: address.city,
        addressType: address.addressType,
      },
      order: shoppingProduct,
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

  return (
    <PaymentContext.Provider value={{ handlePayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
export default PaymentContext;
