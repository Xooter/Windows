import { Router } from "express";
import {
  getAlarms,
  activeAlarm,
  createAlarm,
  deleteAlarm,
} from "../controllers/alarmsController.js";

const router = Router();

router.get("/", getAlarms);

router.get("/active/:id", activeAlarm);

router.post("/", createAlarm);

router.delete("/:id", deleteAlarm);

export default router;
