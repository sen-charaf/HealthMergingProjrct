import express from "express";
import {
  createHealthCondition,
  getHealthCategories,
  getHealthConditions,
} from "../controllers/healthConditionController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

// Basic CRUD routes
router.route("/").post(createHealthCondition).get(getHealthConditions);
router.route("/categories").get(getHealthCategories);

export default router;
