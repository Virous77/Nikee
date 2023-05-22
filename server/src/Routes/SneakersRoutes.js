import express from "express";
import { createSneaker } from "../Controllers/SneakersController.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();

router.post("/sneaker", adminOnly, createSneaker);
// router.get("/sneakers", getReviews);

export default router;
