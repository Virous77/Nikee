import express from "express";
import {
  changePassword,
  createUser,
  loginUser,
  updateUser,
  getUser,
} from "../Controllers/userController.js";
import { validateId } from "../middlewares/validateId.js";
import { AuthValidate } from "../Validation/Validate.js";

const router = express.Router();

router.post("/user", AuthValidate, createUser);
router.get("/user/:id", getUser);
router.post("/user/login", loginUser);
router.put("/user/:id", validateId, updateUser);
router.put("/user/change-password/:id", validateId, changePassword);

export default router;
