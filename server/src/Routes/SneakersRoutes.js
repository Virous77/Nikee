import express from "express";
import { createSneaker } from "../Controllers/SneakersController.js";
import { adminOnly } from "../middlewares/adminOnly";

const router = express.Router();

router.post("/sneakers", adminOnly, createSneaker);
// router.get("/sneakers", getReviews);

export default router;
