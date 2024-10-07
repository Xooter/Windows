import { Router } from "express";
import {
  getAlarms,
  createAlarm,
  deleteAlarm,
} from "../controllers/alarmsController.js";

const router = Router();

router.get("/", getAlarms);

router.post("/", createAlarm);

router.delete("/:id", deleteAlarm);

export default router;
