import express from "express";
import {
  changePassword,
  createUser,
  loginUser,
  updateUser,
} from "../Controllers/user.js";

const router = express.Router();

router.post("/user", createUser);
router.post("/user/login", loginUser);
router.put("/user/:id", updateUser);
router.put("/user/change-pass/:id", changePassword);

export default router;
