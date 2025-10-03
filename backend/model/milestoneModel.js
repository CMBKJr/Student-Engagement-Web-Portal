import mongoose from "mongoose";

const Schema = mongoose.Schema;

const milestoneSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // dueDate: {
    //     type: Date
    // },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  { timestamps: true }
);

export const milestoneModel = mongoose.model("Milestone", milestoneSchema);
