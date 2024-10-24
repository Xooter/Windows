import { Router } from "express";
import {
  getRules,
  createRule,
  activeRule,
  deleteRule,
} from "../controllers/rulesController.js";

const router = Router();

router.get("/", getRules);

router.get("/active/:id", activeRule);

router.post("/", createRule);

router.delete("/:id", deleteRule);

export default router;
