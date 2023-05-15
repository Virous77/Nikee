import Coupon from "../Models/Coupon.js";
import { createError } from "../utils/utility.js";
import User from "../Models/User.js";

export const createCoupon = async (req, res, next) => {
  const { coupon, validFrom, validTill, discountPercent, userId } = req.body;

  try {
    if (!coupon || !validFrom || !validTill || !discountPercent)
      return next(
        createError({
          message: "All fields need to fill to create Coupon",
          status: 400,
        })
      );

    const user = await User.findById(userId);

    if (!user.isAdmin)
      return next(
        createError({ status: 400, message: "You are not authorized" })
      );

    const newCoupon = new Coupon(req.body);
    await newCoupon.save();

    res.status(201).json({ message: "Coupon created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getCoupons = async (req, res, next) => {
  try {
    const allCoupons = await Coupon.find();
    res.status(200).json(allCoupons);
  } catch (error) {
    next(error);
  }
};

export const deleteCoupon = async (req, res, next) => {
  const { id, userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user.isAdmin)
      return next(
        createError({ status: 400, message: "You are not authorized" })
      );

    await Coupon.findByIdAndDelete(id);
    res.status(200).json({ message: "Coupon removed successfully" });
  } catch (error) {
    next(error);
  }
};
