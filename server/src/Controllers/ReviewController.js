import Review from "../Models/Review.js";

export const createReview = async (req, res, next) => {
  try {
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
