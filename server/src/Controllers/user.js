import User from "../Models/User.js";
import { createError } from "../utils/utility.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  const { name, email, image, about, password, birth, gender, country } =
    req.body;

  if (!name || !email || !password || !birth || !gender || !country) {
    return next(createError({ status: 400, message: "Fields can't be empty" }));
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const userData = {
    name,
    email,
    image,
    about,
    password: hash,
    birth,
    gender,
    country,
  };

  const newUser = new User(userData);
  await newUser.save();

  res.status(201).json(newUser);
  try {
  } catch (error) {
    next(next);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password: userPass } = req.body;
  if (!email || !userPass) {
    return next(createError({ status: 400, message: "Fields can't be empty" }));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(createError({ status: 400, message: "User not exists" }));
  }

  const pass = await bcrypt.compare(userPass, user.password);
  if (!pass) {
    return next(createError({ status: 400, message: "Password is incorrect" }));
  }

  const { password, ...otherDetails } = user._doc;
  res.status(200).json(otherDetails);
  try {
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, image, about } = req.body;

  const user = await User.findById(id);
  if (!user) {
    return next(createError({ status: 400, message: "User not exists" }));
  }

  const { name: userName, image: userImage, about: userAbout } = user;
  user.name = name || userName;
  user.image = image || userImage;
  user.about = about || userAbout;

  try {
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  const id = req.params.id;
  const { password, newPassword } = req.body;
  if (!password || !newPassword) {
    return next(createError({ status: 400, message: "Fields can't be empty" }));
  }

  const user = await User.findById(id);
  if (!user) {
    return next(createError({ status: 400, message: "User not exists" }));
  }

  const pass = await bcrypt.compare(password, user.password);
  if (!pass) {
    return next(
      createError({ status: 400, message: "Old password not match" })
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  user.password = hash;
  await user.save();
  res.status(200).json({ message: "Password changed successfully" });
  try {
  } catch (error) {
    next(error);
  }
};
