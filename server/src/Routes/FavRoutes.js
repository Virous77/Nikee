import express from "express";
import {
  createFav,
  removeFav,
  getFav,
  getFavs,
} from "../Controllers/favController.js";
import { validateId } from "../middlewares/validateId.js";

const router = express.Router();

router.post("/fav", createFav);
router.delete("/fav/:id", validateId, removeFav);
router.get("/fav/:productId/:userId", getFav);
router.get("/fav/:id", validateId, getFavs);

export default router;
