import express from "express";
import {
  getQueryProducts,
  queryProducts,
} from "../Controllers/SearchController.js";

const router = express.Router();

router.post("/search", queryProducts);
router.get("/search/:query", getQueryProducts);

export default router;
