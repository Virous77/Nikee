import express from "express";
import {
  createAddress,
  getAddress,
  deleteAddress,
} from "../Controllers/Address.js";

const router = express.Router();

router.post("/address", createAddress);
router.get("/address/:id", getAddress);
router.delete("/address/:id", deleteAddress);

export default router;
