import User from "../Models/User.js";
import { createError } from "../utils/utility.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res, next) => {
  const { email, password, ...rest } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const userData = {
    password: hash,
    email: email.toLowerCase(),
    ...rest,
  };

  const user = await User.findOne({ email: email.toLowerCase() });

  if (user) {
    return next(createError({ status: 400, message: "User already exists" }));
  }

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

  const user = await User.findOne({ email: email.toLowerCase() });
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
  const { name, email } = req.body;

  if (!name || !email) {
    return next(
      createError({
        status: 400,
        message: "Name and email fields can't be empty",
      })
    );
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return next(createError({ status: 400, message: "User not found" }));
    }
    res.status(200).json({ message: "Profile Updated Successfully" });
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
    return next(createError({ status: 400, message: "Old password is wrong" }));
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

export const getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    if (!user)
      return next(createError({ status: 400, message: "User not exists" }));
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
