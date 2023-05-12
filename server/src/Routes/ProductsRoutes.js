import express from "express";
import {
  createProduct,
  getProduct,
} from "../Controllers/productsController.js";
import { validateId } from "../middlewares/validateId.js";

const router = express.Router();

router.post("/product", createProduct);
router.get("/product/:id", validateId, getProduct);

export default router;
