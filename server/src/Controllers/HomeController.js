import Home from "../Models/Home.js";
import { createError } from "../utils/utility";

export const createHomeData = async (req, res, next) => {
  try {
    const homeData = new Home(req.body);
    await homeData.save();

    res.status(201).json(homeData);
  } catch (error) {
    next(error);
  }
};

export const getHomeData = async (req, res, next) => {
  try {
    const homedData = await Home.find();
    res.status(200).json(homedData);
  } catch (error) {
    next(error);
  }
};

export const updateHomeData = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedData = await Home.findByIdAndUpdate(id, { $set: req.body });
    res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

export const deleteHomeData = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedData = await Home.findByIdAndDelete(id);
    res.status(200).json({ message: "Home Data successfully deleted" });
  } catch (error) {
    next(error);
  }
};
