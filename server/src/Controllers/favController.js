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
  const id = req.params.id;
  try {
    await Fav.findByIdAndDelete(id);
    res.status(200).json({ message: "Product removed from Fav" });
  } catch (error) {
    next(error);
  }
};
