import express from "express";
import { createReview, getReviews } from "../Controllers/ReviewController.js";

const router = express.Router();

router.post("/review", createReview);
router.get("/review/:productId", getReviews);

export default router;
