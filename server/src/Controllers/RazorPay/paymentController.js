import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import Order from "../../Models/Order.js";
import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";
import { createError } from "../../utils/utility.js";

const filePath = path.resolve(".", "id.json");

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

let tempData = [];

export const checkout = async (req, res, next) => {
  const amount = req.body.amount;

  const options = {
    amount,
    currency: "INR",
  };

  const createOrder = new Order(req.body);

  try {
    const order = await instance.orders.create(options);
    createOrder.save();
    const { _id } = createOrder._doc;

    const data = await fs.promises.readFile(filePath, "utf-8");
    if (data) {
      tempData = JSON.parse(data);
    }

    const newData = {
      orderId: order.id,
      _id: _id.toString(),
    };

    tempData.push(newData);

    await fs.promises.writeFile(filePath, JSON.stringify(tempData));

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const verifyAndCompletePayment = async (req, res, next) => {
  try {
    const body =
      req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== req.body.razorpay_signature)
      return next(
        createError({
          status: 400,
          message: "Something went wrong, try again later",
        })
      );

    const data = await fsPromises.readFile(filePath, "utf-8");
    const userData = JSON.parse(data);

    const currentUserOrder = userData.find(
      (order) => order.orderId === req.body.razorpay_order_id
    );

    const filterAddress = userData.filter(
      (order) => order.orderId !== req.body.razorpay_order_id
    );

    const filter = { _id: currentUserOrder._id };
    const update = {
      payment: {
        paymentId: req.body.razorpay_payment_id,
        orderId: req.body.razorpay_order_id,
        signature: req.body.razorpay_signature,
      },
    };
    const options = { new: true };
    const updatedOrder = await Order.findOneAndUpdate(filter, update, options);
    await fsPromises.writeFile(filePath, JSON.stringify(filterAddress));

    const { _id } = updatedOrder._doc;

    res.redirect(`${process.env.PAYMENT_DONE_URL}?orderId=${_id.toString()}`);
  } catch (error) {
    next(error);
  }
};

export const getOrderData = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const orderData = await Order.findById(orderId);
    if (!orderData)
      return next(
        createError({ status: 400, message: "Order id doesn't not exists" })
      );

    res.status(200).json(orderData);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const ordersData = await Order.find({ userId });
    res.status(200).json(ordersData);
  } catch (error) {
    next(error);
  }
};
