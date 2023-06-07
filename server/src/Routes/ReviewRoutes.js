import express from "express";
import { createReview, getReviews } from "../Controllers/ReviewController.js";
import { ReviewValidate } from "../Validation/Validate.js";

const router = express.Router();

router.post("/review", ReviewValidate, createReview);
router.get("/review/:productId", getReviews);

export default router;
