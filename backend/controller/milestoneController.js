import mongoose from "mongoose";
import { milestoneModel } from "../model/milestoneModel.js";
import asyncHandler from "express-async-handler";

export const createMilestone = asyncHandler(async (req, res) => {
  const { title, description, stage } = req.body;

  if (!title || !description || !stage) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const milestone = await milestoneModel.create({ title, description, stage });

  res.status(201).json({ milestone, message: "Milestone created" });
});

export const getMilestones = asyncHandler(async (req, res) => {
  const milestones = await milestoneModel.find();

  res.status(200).json(milestones);
});

export const updateMilestone = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Id" });
  }

  const updated = await milestoneModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({ updated, message: "Milestone updated" });
});

export const deleteMilestone = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Id" });
  }

  const deleted = await milestoneModel.findByIdAndDelete(id);

  res.status(200).json({ deleted, message: "Milestone deleted" });
});
