import express from "express";
import protect from "../middleware/authMiddleware.js";
import { setBudget, getBudget } from "../controllers/budgetController.js";

const router = express.Router();

router.post("/", protect, setBudget);
router.get("/", protect, getBudget);

export default router;
