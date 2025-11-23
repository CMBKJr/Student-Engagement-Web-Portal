import mongoose from "mongoose";
import { milestoneModel } from "../model/milestoneModel.js";
import asyncHandler from "express-async-handler";


export const createMilestone = asyncHandler(async (req, res) => {
  const { title, description, stage } = req.body;

  if (!title || !description || !stage) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const milestone = await milestoneModel.create({
    title,
    description,
    stage
  });

  if (!milestone) {
    return res.status(400).json({ message: "Invalid user data received" });
  }
});

