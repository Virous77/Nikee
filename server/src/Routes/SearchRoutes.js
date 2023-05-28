import express from "express";
import { queryProducts } from "../Controllers/SearchController.js";

const router = express.Router();

router.post("/search", queryProducts);

export default router;
