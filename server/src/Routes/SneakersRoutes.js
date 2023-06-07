import express from "express";
import {
  createSneaker,
  getPaginateSneaker,
  getSneaker,
  getSneakerIconic,
  getSneakers,
  relatedSneakers,
  updateSneaker,
} from "../Controllers/SneakersController.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();

router.post("/sneaker", adminOnly, createSneaker);
router.get("/sneaker", getSneakers);
router.get("/sneaker/:name", getSneaker);
router.get("/sneaker/iconic/all", getSneakerIconic);
router.get("/sneaker/pagination/:pageNumber/:pageSize", getPaginateSneaker);
router.put("/sneaker/:id", adminOnly, updateSneaker);
router.delete("/sneaker/:adminId/:id", adminOnly);
router.get("/sneaker/related/:type", relatedSneakers);

export default router;
