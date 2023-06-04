import express from "express";
import {
  createCoupon,
  getCoupons,
  deleteCoupon,
} from "../Controllers/couponController.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();

router.post("/coupon", adminOnly, createCoupon);
router.get("/coupon", getCoupons);
router.delete("/coupon/:id/:adminId", adminOnly, deleteCoupon);

export default router;
