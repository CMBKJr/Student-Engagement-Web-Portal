import express from "express";
import {
  createMilestone,
  getMilestones,
  updateMilestone,
  deleteMilestone,
  getCompletedMilestones
} from "../controller/milestoneController.js";

const router = express.Router();

router.get("/", getMilestones);
router.post("/", createMilestone);
router.patch("/:id", updateMilestone);
router.delete("/:id", deleteMilestone);
router.post("/get-completed", getCompletedMilestones);

export default router;
