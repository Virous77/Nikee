import Fav from "../Models/Fav.js";
import { createError } from "../utils/utility.js";

export const createFav = async (req, res, next) => {
  try {
    const newFav = new Fav(req.body);
    await newFav.save();
    res.status(201).json({ message: "Product added to favourite" });
  } catch (error) {
    next(error);
  }
};

export const removeFav = async (req, res, next) => {
  const { id, userId } = req.params;
  try {
    const gotData = await Fav.findOne({
      userId,
      $or: [{ _id: id }, { productId: id }],
    });
    if (!gotData) {
      return res.status(404).json({ message: "Product not found in Fav" });
    }
    await gotData.deleteOne();
    res.status(200).json({ message: "Product removed from Fav" });
  } catch (error) {
    next(error);
  }
};

export const getFav = async (req, res, next) => {
  const { userId, productId } = req.params;
  try {
    const favData = await Fav.findOne({ userId, productId });

    if (!favData) return res.status(200).json({ status: false });
    res.status(200).json({ status: true });
  } catch (error) {
    next(error);
  }
};

export const getFavs = async (req, res, next) => {
  const id = req.params.id;

  try {
    const favData = await Fav.find({ userId: id });
    res.status(200).json(favData);
  } catch (error) {
    next(error);
  }
};
