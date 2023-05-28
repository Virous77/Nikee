import { createError } from "../utils/utility.js";
import Products from "../Models/Products.js";
import Sneakers from "../Models/Sneakers.js";

export const queryProducts = async (req, res, next) => {
  const { query } = req.body;
  try {
    const queryData = await Products.find({
      $or: [
        { name: { $regex: new RegExp(query, "i") } },
        { category: { $regex: new RegExp(query, "i") } },
        { brands: { $regex: new RegExp(query, "i") } },
      ],
    });

    res.json(queryData);
  } catch (error) {
    next(error);
  }
};
