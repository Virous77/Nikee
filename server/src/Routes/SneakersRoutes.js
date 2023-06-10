import express from "express";
import {
  createSneaker,
  getPaginateSneaker,
  getSneaker,
  getSneakerIconic,
  getSneakers,
  relatedSneakers,
  updateSneaker,
  getOnlySneakers,
} from "../Controllers/SneakersController.js";
import { adminOnly } from "../middlewares/adminOnly.js";
import { ProductValidate } from "../Validation/Validate.js";

const router = express.Router();

router.post("/sneaker", adminOnly, ProductValidate, createSneaker);
router.get("/sneaker", getOnlySneakers);
router.get("/sneaker/:pageNumber/:pageSize", getSneakers);
router.get("/sneaker/:name", getSneaker);
router.get("/sneaker/iconic/star/all", getSneakerIconic);
router.get("/sneaker/pagination/:pageNumber/:pageSize", getPaginateSneaker);
router.put("/sneaker/:id", adminOnly, updateSneaker);
router.delete("/sneaker/:adminId/:id", adminOnly);
router.get("/sneaker/related/brand/:type", relatedSneakers);

export default router;
