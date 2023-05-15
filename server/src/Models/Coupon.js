import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    coupon: {
      type: String,
      required: true,
      unique: true,
    },
    validFrom: {
      type: String,
      required: true,
    },
    validTill: {
      type: String,
      required: true,
    },
    discountPercent: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

export default mongoose.model("Coupon", CouponSchema);
