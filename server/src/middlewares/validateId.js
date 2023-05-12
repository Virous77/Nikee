import mongoose from "mongoose";
import { createError } from "../utils/utility.js";

export const validateId = (req, res, next) => {
  const id = req.params.id || req.body.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return next(createError({ status: 400, message: "Id is not valid" }));

  next();
};
