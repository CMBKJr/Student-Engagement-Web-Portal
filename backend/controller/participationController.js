import { userModel } from "../model/userModel.js";
import { eventModel } from "../models/eventModel.js";
import EventParticipation from "../models/ParticipationModel.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const registerForEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res
      .status(400)
      .json({ message: "userId and eventId are required." });
  }

  if (!isValidObjectId(userId) || !isValidObjectId(eventId)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }

  try {
    const user = await userModel.findById(userId).lean();
    const event = await eventModel.findById(eventId).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    const existingRegistration = await EventParticipation.findOne({
      userId,
      eventId,
    });
    if (existingRegistration) {
      if (existingRegistration.status === "registered") {
        return res
          .status(409)
          .json({ message: "User is already registered for this event." });
      }
    }

    if (event.capacity !== null && event.capacity !== undefined) {
      const registeredCount = await EventParticipation.countDocuments({
        eventId,
        status: "registered",
      });
      if (registeredCount >= event.capacity) {
        return res.status(403).json({ message: "Event is full." });
      }
    }

    const participation = new EventParticipation({
      userId,
      eventId,
      status: "registered",
      registeredAt: new Date(),
    });

    await participation.save();

    res.status(201).json({
      message: "Successfully registered for the event.",
      participation,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "User is already registered for this event." });
    }
    console.error("Error registering user for event:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

export const getRegisteredEvents = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "userId is required." });
  }

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }

  try {
    const registeredParticipations = await EventParticipation.find({
      userId: userId,
      status: "registered",
    })
      .populate({
        path: "eventId",
        select: "title description flyerUrl location startAt endsAt capacity",
      })
      .select("status registeredAt");

    const registeredEvents = registeredParticipations.map((p) => ({
      participationId: p._id,
      status: p.status,
      registeredAt: p.registeredAt,
      event: p.eventId,
    }));

    res.status(200).json({ registeredEvents });
  } catch (error) {
    console.error("Error fetching registered events:", error);
    res
      .status(500)
      .json({ message: "Server error fetching registered events." });
  }
};

export const getAttendedEvents = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "userId is required." });
  }

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }

  try {
    const attendedParticipations = await EventParticipation.find({
      userId: userId,
      status: "attended",
    })
      .populate({
        path: "eventId",
        select: "title description flyerUrl location startAt endsAt capacity",
      })
      .select("status registeredAt attendedAt");

    const attendedEvents = attendedParticipations.map((p) => ({
      participationId: p._id,
      status: p.status,
      registeredAt: p.registeredAt,
      attendedAt: p.attendedAt,
      event: p.eventId,
    }));

    res.status(200).json({ attendedEvents });
  } catch (error) {
    console.error("Error fetching attended events:", error);
    res.status(500).json({ message: "Server error fetching attended events." });
  }
};

export const unregisterFromEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res
      .status(400)
      .json({ message: "userId and eventId are required." });
  }

  if (!isValidObjectId(userId) || !isValidObjectId(eventId)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }

  try {
    const participation = await EventParticipation.findOne({
      userId,
      eventId,
    });

    if (!participation) {
      return res
        .status(404)
        .json({ message: "Registration not found for this user and event." });
    }

    if (participation.status === "attended") {
      return res.status(403).json({
        message:
          "Cannot unregister from an event that has already been attended.",
      });
    }

    if (participation.status === "cancelled") {
      return res
        .status(200)
        .json({ message: "Registration is already cancelled.", participation });
    }

    participation.status = "cancelled";
    await participation.save();

    res.status(200).json({
      message: "Successfully unregistered from the event.",
      participation,
    });
  } catch (error) {
    console.error("Error unregistering user from event:", error);
    res.status(500).json({ message: "Server error during unregistration." });
  }
};
