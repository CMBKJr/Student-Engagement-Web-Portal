import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    currentMilestoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Milestone",
    },
    completedMilestones: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Milestone" },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    displayImageUrl: {
      type: String,
      required: true,
      default:
        "https://www.pngfind.com/pngs/m/63-631239_login-png-login-icon-png-transparent-png.png",
    },
    role: {
      type: String,
      enum: ["admin", "student"],
      required: true,
      default: "student",
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);
