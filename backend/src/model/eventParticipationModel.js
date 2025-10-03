import mongoose from "mongoose";

const ParticipationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["registered", "attended", "cancelled", "no_show"],
      default: "registered",
      index: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    attendedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

ParticipationSchema.index({ userId: 1, eventId: 1 }, { unique: true });

export default mongoose.model("EventParticipation", ParticipationSchema);
