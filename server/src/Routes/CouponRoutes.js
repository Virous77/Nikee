import express from "express";
import {
  createCoupon,
  getCoupons,
  deleteCoupon,
  updateCoupon,
} from "../Controllers/couponController.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();

router.post("/coupon", adminOnly, createCoupon);
router.get("/coupon", getCoupons);
router.delete("/coupon/:id/:adminId", adminOnly, deleteCoupon);
router.put("/coupon/:id/:adminId", adminOnly, updateCoupon);

export default router;
