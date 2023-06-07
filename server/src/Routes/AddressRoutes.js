import express from "express";
import {
  createAddress,
  getAddress,
  deleteAddress,
  updateAddress,
} from "../Controllers/addressController.js";
import { validateId } from "../middlewares/validateId.js";
import { AddressValidate } from "../Validation/Validate.js";

const router = express.Router();

router.post("/address", AddressValidate, createAddress);
router.get("/address/:id", validateId, getAddress);
router.delete("/address/:id", validateId, deleteAddress);
router.put("/address/:id", validateId, updateAddress);

export default router;
