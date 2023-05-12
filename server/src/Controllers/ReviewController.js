import Review from "../Models/Review.js";
import { createError } from "../utils/utility.js";

export const createReview = async (req, res, next) => {
  const { userId, productId, message, rating, userName } = req.body;

  try {
    if (!userId || !productId || !message || rating <= 0 || !userName)
      return next(
        createError({
          status: 400,
          message: "Rating and Message fields are empty",
        })
      );

    const newReview = new Review(req.body);
    await newReview.save();

    res.status(201).json({ message: "Thank you for your Review" });
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const reviews = await Review.find({ productId });

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};
