import { Router } from "express";
import {
  getRules,
  createRule,
  deleteRule,
} from "../controllers/rulesController.js";

const router = Router();

router.get("/", getRules);

router.post("/", createRule);

router.delete("/:id", deleteRule);

export default router;
