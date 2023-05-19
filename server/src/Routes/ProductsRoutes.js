import express from "express";
import {
  createProduct,
  getProduct,
  getProductByType,
  getProducts,
} from "../Controllers/productsController.js";

const router = express.Router();

router.post("/product", createProduct);
router.get("/product/:slug", getProduct);
router.get("/product/type/:type", getProducts);

export default router;
