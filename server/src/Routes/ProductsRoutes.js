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
  updateProduct,
  deleteImage,
  relatedProducts,
} from "../Controllers/productsController.js";
import { adminOnly } from "../middlewares/adminOnly.js";
import { ProductValidate } from "../Validation/Validate.js";

const router = express.Router();

router.post("/product", adminOnly, ProductValidate, createProduct);
router.get("/product/:slug", getProduct);
router.get("/product/type/:type/:pageNumber/:pageSize", getProducts);
router.get("/product/featured/all/:pageNumber/:pageSize", getFeaturedProduct);
router.get("/product/popular/all", getPopularProducts);
router.get("/product/all/available", getAllProducts);
router.get("/product/pagination/:pageNumber/:pageSize", getPaginationProduct);
router.delete("/product/:adminId/:id", adminOnly, deleteProduct);
router.put("/product/:id", adminOnly, updateProduct);
router.post("/product/image/:adminId", adminOnly, deleteImage);
router.get("/product/related/:type", relatedProducts);

export default router;
