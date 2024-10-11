import { Router } from "express";
import { getInfo, sendInfo } from "../controllers/mainController.js";

const router = Router();

router.get("/", getInfo);
router.post("/", sendInfo);

export default router;
