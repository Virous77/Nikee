import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
    },
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

export default mongoose.model("Review", ReviewSchema);
