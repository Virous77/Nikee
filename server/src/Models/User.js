import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },

    about: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: true,
    },
    birth: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

export default mongoose.model("User", UserSchema);
