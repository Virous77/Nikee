import express from "express";
import { createAddress, getAddress } from "../Controllers/Address.js";

const router = express.Router();

router.post("/address", createAddress);
router.get("/address/:id", getAddress);

export default router;
