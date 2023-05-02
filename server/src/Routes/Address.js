import express from "express";
import { createAddress } from "../Controllers/Address.js";

const router = express.Router();

router.post("/address", createAddress);

export default router;
