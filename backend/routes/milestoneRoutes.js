import express from "express";
import {
  createMilestone,
  getMilestones,
  updateMilestone,
  deleteMilestone,
} from "../controller/milestoneController.js";

const router = express.Router();

router.get("/", getMilestones);
router.post("/", createMilestone);
router.patch("/:id", updateMilestone);
router.delete("/:id", deleteMilestone);

export default router;
