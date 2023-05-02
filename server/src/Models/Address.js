import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  addressType: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Address", AddressSchema);
