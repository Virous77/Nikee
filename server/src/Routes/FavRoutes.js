import express from "express";
import { createFav, removeFav } from "../Controllers/favController.js";
import { validateId } from "../middlewares/validateId.js";

const router = express.Router();

router.post("/fav", createFav);
router.delete("/fav/:id", validateId, removeFav);

export default router;
