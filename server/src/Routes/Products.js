import express from "express";
import { createProduct } from "../Controllers/products.js";

const router = express.Router();

router.post("/product", createProduct);

export default router;
