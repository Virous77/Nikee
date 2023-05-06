import express from "express";
import {
  checkout,
  getOrderData,
  verifyAndCompletePayment,
} from "../Controllers/RazorPay/payment.js";

const router = express.Router();

router.post("/checkout", checkout);
router.post("/paymentverification", verifyAndCompletePayment);
router.get("/order/:id", getOrderData);

export default router;
