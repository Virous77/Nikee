import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    paymentSuccess: {
      type: Boolean,
      default: false,
    },
    address: {
      address: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      addressType: {
        type: String,
        enum: ["home", "office", "other"],
        required: true,
      },
    },
    order: {
      type: [{ name: String, image: String, quantity: Number, price: Number }],
      required: true,
    },
    payment: {
      paymentId: {
        type: String,
      },
      orderId: {
        type: String,
      },
      signature: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

export default mongoose.model("Order", OrderSchema);
