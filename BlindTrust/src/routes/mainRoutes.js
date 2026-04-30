import { Router } from "express";
import {
  getTemperature,
  getInfo,
  sendInfo,
} from "../controllers/mainController.js";

const router = Router();

router.get("/", getInfo);
router.get("/temp/", getTemperature);
router.post("/", sendInfo);

export default router;
