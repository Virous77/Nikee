import { createData } from "../../api/api";
import { getLocalData } from "../../utils/data";
import { useAuthContext } from "../../store/authContext";
import { nikeLogo } from "../../utils/data";

const Payment = () => {
  const id = getLocalData("nike");
  const { UserData } = useAuthContext();

  const makePayment = async () => {
    const checkoutData = {
      amount: 400,
      userId: id,
      address: {
        address: "Patna bihar",
        landmark: "balesara",
        postalCode: "841205",
        state: "bihar",
        city: "saran",
        addressType: "home",
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

  return <div onClick={makePayment}>Payment</div>;
};

export default Payment;
