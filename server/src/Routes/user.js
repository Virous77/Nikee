import express from "express";
import { createUser } from "../Controllers/user.js";

const router = express.Router();

router.post("/user", createUser);

export default router;
