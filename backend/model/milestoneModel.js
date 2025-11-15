import mongoose from "mongoose";

const Schema = mongoose.Schema;

const milestoneSchema = new Schema(
  {
    title: {
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
    stage: {
      type: String,
      // default: 0,
      // index: true,
    },
    autoKeywords: { 
      type: [String], 

    }
  },
  
  { timestamps: true }
);

export const milestoneModel = mongoose.model("Milestone", milestoneSchema);
