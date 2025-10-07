import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema(
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
    flyerUrl: {
      type: String,
    },
    location: {
      type: String,
      trim: true,
    },
    startAt: {
      type: Date,
      required: true,
      index: true,
    },
    endsAt: {
      type: Date,
      required: true,
    },
    capacity: {
      type: Number,
    },
    externalId: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
    },
    categories: {
      type: [String],
    },
    externalLink: {
      type: String,
    },
  },
  { timestamps: true }
);

export const eventModel = mongoose.model("Event", eventSchema);
