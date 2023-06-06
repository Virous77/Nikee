import express from "express";
import { adminOnly } from "../middlewares/adminOnly.js";
import {
  createHomeData,
  deleteHomeData,
  getHomeData,
  updateHomeData,
} from "../Controllers/HomeController.js";

const router = express.Router();

router.post("/home", adminOnly, createHomeData);
router.get("/home", getHomeData);
router.put("/home", adminOnly, updateHomeData);
router.delete("/home", adminOnly, deleteHomeData);

export default router;
