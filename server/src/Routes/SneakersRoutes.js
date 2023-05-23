import express from "express";
import {
  createSneaker,
  getSneaker,
  getSneakers,
} from "../Controllers/SneakersController.js";
import { adminOnly } from "../middlewares/adminOnly.js";
import { validateId } from "../middlewares/validateId.js";

const router = express.Router();

router.post("/sneaker", adminOnly, createSneaker);
router.get("/sneaker", getSneakers);
router.get("/sneaker/:id", validateId, getSneaker);

export default router;
