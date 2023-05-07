import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
  },
  size: {
    type: ["string"],
    required: true,
  },
  heroImage: {
    type: String,
    required: true,
  },
  images: {
    type: ["string"],
    required: true,
  },
  productDetails: {
    type: String,
    required: true,
  },
  productInformation: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Products", ProductsSchema);
