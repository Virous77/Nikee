import express from "express";
import {
  createProduct,
  getProduct,
  getProductByType,
} from "../Controllers/productsController.js";
import { validateId } from "../middlewares/validateId.js";

const router = express.Router();

router.post("/product", createProduct);
router.get("/product/:slug", getProduct);
router.get("/product/type/:type", getProductByType);

export default router;
