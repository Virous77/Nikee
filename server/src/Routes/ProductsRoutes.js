import express from "express";
import {
  createProduct,
  getFeaturedProduct,
  getProduct,
  getProducts,
  getPopularProducts,
  getAllProducts,
  getPaginationProduct,
  deleteProduct,
} from "../Controllers/productsController.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();

router.post("/product", adminOnly, createProduct);
router.get("/product/:slug", getProduct);
router.get("/product/type/:type", getProducts);
router.get("/product/featured/all", getFeaturedProduct);
router.get("/product/popular/all", getPopularProducts);
router.get("/product/all/available", getAllProducts);
router.get("/product/pagination/:pageNumber/:pageSize", getPaginationProduct);
router.delete("/product/:adminId/:id", adminOnly, deleteProduct);

export default router;
