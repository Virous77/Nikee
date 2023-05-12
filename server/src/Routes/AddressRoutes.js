import express from "express";
import {
  createAddress,
  getAddress,
  deleteAddress,
  updateAddress,
} from "../Controllers/addressController.js";
import { validateId } from "../middlewares/validateId.js";

const router = express.Router();

router.post("/address", createAddress);
router.get("/address/:id", validateId, getAddress);
router.delete("/address/:id", validateId, deleteAddress);
router.put("/address/:id", validateId, updateAddress);

export default router;
