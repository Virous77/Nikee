import express from "express";
import {
  checkout,
  getOrderData,
  getOrders,
  verifyAndCompletePayment,
} from "../Controllers/RazorPay/paymentController.js";
import { validateId } from "../middlewares/validateId.js";

const router = express.Router();

router.post("/checkout", checkout);
router.post("/paymentverification", verifyAndCompletePayment);
router.get("/order/:id", validateId, getOrderData);
router.get("/order/user/:id", validateId, getOrders);

export default router;
