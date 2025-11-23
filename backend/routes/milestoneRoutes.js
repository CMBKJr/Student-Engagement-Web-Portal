import express from "express";
import { createMilestone, getMilestones, getCompletedMilestones } from "../controller/milestoneController.js";

const router = express.Router();

router.get("/", getMilestones);

router.post("/", createMilestone);

router.post("/get-completed", getCompletedMilestones);

export default router;
