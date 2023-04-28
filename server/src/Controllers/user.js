import User from "../Models/User.js";
import { createError } from "../utils/utility.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  const { name, email, image, about, password } = req.body;

  if (!name || !email || !password) {
    return next(
      createError({ status: 400, message: "Fields can't be empty!" })
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const userData = {
    name,
    email,
    image,
    about,
    password: hash,
  };

  const newUser = new User(userData);
  await newUser.save();

  res.status(201).json(newUser);
  try {
  } catch (error) {
    next(next);
  }
};
