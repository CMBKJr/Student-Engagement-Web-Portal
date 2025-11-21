import express from "express";
import { createMilestone, getMilestones } from "../controller/milestoneController.js";

const router = express.Router();

router.get("/", getMilestones);

router.post("/", createMilestone);

export default router;
