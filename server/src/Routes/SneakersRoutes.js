import express from "express";
import {
  createSneaker,
  getSneaker,
  getSneakerIconic,
  getSneakers,
} from "../Controllers/SneakersController.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();

router.post("/sneaker", adminOnly, createSneaker);
router.get("/sneaker", getSneakers);
router.get("/sneaker/:name", getSneaker);
router.get("/sneaker/iconic/all", getSneakerIconic);

export default router;
