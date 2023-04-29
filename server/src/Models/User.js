import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
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
});

export default mongoose.model("User", UserSchema);
