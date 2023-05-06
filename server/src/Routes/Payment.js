import express from "express";
import {
  checkout,
  verifyAndCompletePayment,
} from "../Controllers/RazorPay/payment.js";

const router = express.Router();

router.post("/checkout", checkout);
router.post("/paymentverification", verifyAndCompletePayment);

export default router;
