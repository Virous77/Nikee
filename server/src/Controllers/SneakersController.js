import Sneakers from "../Models/Sneakers.js";
import { createError } from "../utils/utility.js";

export const createSneaker = async (req, res, next) => {
  try {
    const newSneakers = new Sneakers(req.body);
    await newSneakers.save();
    if (!newSneakers)
      return next(
        createError({ status: 404, message: "Something went wrong,Try again" })
      );
    res.status(200).json(newSneakers);
  } catch (error) {
    next(error);
  }
};
