import { Router } from "express";
import {
  handlePower,
  handleSmart,
  handleEconomy,
  handleQuiet,
  handleSleep,
  handleSuper,
  handleDirection,
  handleMode,
  handleTemp,
  handleFan,
  handleStatus,
} from "../controllers/acController.js";

const router = Router();

router.get("/", handleStatus);
router.get("/power", handlePower);
router.get("/smart", handleSmart);
router.get("/economy", handleEconomy);
router.get("/quiet", handleQuiet);
router.get("/sleep", handleSleep);
router.get("/super", handleSuper);
router.get("/direction", handleDirection);
router.get("/mode", handleMode);
router.get("/temp", handleTemp);
router.get("/fan", handleFan);

export default router;
