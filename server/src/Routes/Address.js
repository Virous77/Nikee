import express from "express";
import {
  createAddress,
  getAddress,
  deleteAddress,
  updateAddress,
} from "../Controllers/Address.js";

const router = express.Router();

router.post("/address", createAddress);
router.get("/address/:id", getAddress);
router.delete("/address/:id", deleteAddress);
router.put("/address/:id", updateAddress);

export default router;
