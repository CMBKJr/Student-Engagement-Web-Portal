import mongoose from "mongoose";
import { milestoneModel } from "../model/milestoneModel.js";
import asyncHandler from "express-async-handler";
import { userModel } from "../model/userModel.js";

export const createMilestone = asyncHandler(async (req, res) => {
  const { title, description, stage } = req.body;

  if (!title || !description || !stage) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const milestone = await milestoneModel.create({
    title,
    description,
    stage,
  });

  if (!milestone) {
    return res.status(400).json({ message: "Invalid user data received" });
  }
});

export const getMilestones = asyncHandler(async (req, res) => {
  const milestones = await milestoneModel.find();

  if (!milestones) {
    return res.status(400).json({ message: "No Milestones found" });
  }
  res.status(200).json(milestones);
});

export const getCompletedMilestones = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ err: "Invalid Id" });
  }
  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const completedMilestonesId = user.completedMilestones;
  const completedMilestones = [];

  for (const m_id of completedMilestonesId) {
    const title = await getMilestoneTitle(m_id);
    completedMilestones.push(title);
  }

  res.status(200).json({
    completedMilestones,
    message: "Task completed successfully",
  });
});

const getMilestoneTitle = async (milestoneId) => {
  const milestone = await milestoneModel.findById(milestoneId).lean();

  return milestone?.title || null;
};
