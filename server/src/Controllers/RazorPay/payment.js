import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

export const checkout = async (req, res, next) => {
  const options = {
    amount: 50000, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  try {
    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
