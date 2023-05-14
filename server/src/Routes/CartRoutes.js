import express from "express";
import {
  createCart,
  getCarts,
  deleteCart,
  getCart,
  updateCart,
} from "../Controllers/CartController.js";
import { validateId } from "../middlewares/validateId.js";

const router = express.Router();

router.post("/cart", createCart);
router.get("/cart/:id", validateId, getCarts);
router.delete("/cart/:id", validateId, deleteCart);
router.get("/cart/:id/:userId", getCart);
router.put("/cart/:id", validateId, updateCart);

export default router;
