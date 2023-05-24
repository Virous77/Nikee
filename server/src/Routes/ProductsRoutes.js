import express from "express";
import {
  createProduct,
  getFeaturedProduct,
  getProduct,
  getProducts,
} from "../Controllers/productsController.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();

router.post("/product", adminOnly, createProduct);
router.get("/product/:slug", getProduct);
router.get("/product/type/:type", getProducts);
router.get("/product/featured/all", getFeaturedProduct);

export default router;
