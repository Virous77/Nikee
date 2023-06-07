import Coupon from "../Models/Coupon.js";

export const createCoupon = async (req, res, next) => {
  try {
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

export const updateCoupon = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Coupon.findByIdAndUpdate(id, { $set: req.body });
    res.status(200).json({ message: "Coupon updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteCoupon = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Coupon.findByIdAndDelete(id);
    res.status(200).json({ message: "Coupon removed successfully" });
  } catch (error) {
    next(error);
  }
};
