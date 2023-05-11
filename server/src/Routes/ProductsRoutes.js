import express from "express";
import {
  createProduct,
  getProduct,
} from "../Controllers/productsController.js";

const router = express.Router();

router.post("/product", createProduct);
router.get("/product/:id", getProduct);

export default router;
