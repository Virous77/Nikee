import express from "express";
import {
  createCoupon,
  getCoupons,
  deleteCoupon,
} from "../Controllers/couponController.js";

const router = express.Router();

router.post("/coupon", createCoupon);
router.get("/coupon", getCoupons);
router.delete("/coupon/:id/:userId", deleteCoupon);

export default router;
