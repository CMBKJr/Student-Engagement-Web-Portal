import { userModel } from "../model/userModel.js";
import { eventModel } from "../model/eventModel.js";
import EventParticipation from "../model/eventParticipationModel.js";
import { findMatchingMilestone } from "../utils/matchMilestone.js";
import { milestoneModel } from "../model/milestoneModel.js";
import { transporter } from "../config/emailConfig.js";
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

    // Check for existing registration (any status)
    const existingRegistration = await EventParticipation.findOne({
      userId,
      eventId,
    });

    // Case 1: Already registered
    if (existingRegistration && existingRegistration.status === "registered") {
      return res
        .status(409)
        .json({ message: "User is already registered for this event." });
    }

    // Case 2: Previously cancelled → allow re-register
    if (existingRegistration && existingRegistration.status === "cancelled") {
      existingRegistration.status = "registered";
      existingRegistration.registeredAt = new Date();
      await existingRegistration.save();

      return res.status(200).json({
        message: "Successfully re-registered for the event.",
        participation: existingRegistration,
      });
    }

    // Case 3: Capacity check for fresh registration
    if (event.capacity !== null && event.capacity !== undefined) {
      const registeredCount = await EventParticipation.countDocuments({
        eventId,
        status: "registered",
      });

      if (registeredCount >= event.capacity) {
        return res.status(403).json({ message: "Event is full." });
      }
    }

    // Case 4: Fresh registration
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

    res.status(200).json(registeredEvents);
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

    res.status(200).json(attendedEvents);
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

export const markEventAsAttended = async (req, res) => {
  const { userId, eventId } = req.body;

  const event = await eventModel.findById(eventId).lean();
  const user = await userModel.findById(userId).lean();
  if (!event) return res.status(404).json({ message: "Event not found" });
  if (!user) return res.status(404).json({ message: "User not found" });

  // Mark attended (your existing logic)
  const participation = await EventParticipation.findOne({
    userId,
    eventId,
  });
  participation.status = "attended";
  participation.attendedAt = new Date();
  await participation.save();

  // AUTOMATIC MILESTONE MATCHING
  const matchedMilestone = await findMatchingMilestone(
    event,
    milestoneModel
  );

  if (matchedMilestone) {
    await userModel.findByIdAndUpdate(userId, {
      $addToSet: { completedMilestones: matchedMilestone._id },
    });

    try {
      await transporter.sendMail({
        from: `"Student Engagement Web Portal " <${process.env.EMAIL_USER}>`,
        to: "amcclur6@kennesaw.edu",
        subject: "Student Completed A Milestone",
        html: `
              <h3>Hello Admin,</h3>
              <p>${user.firstname} ${user.lastname} has completed milestone: ${matchedMilestone.title}</p>
            `,
      });
    } catch (error) {
      console.log("Email send error:", error);

      return res.json({
        message: "Event marked as attended. Error sending email to admin",
        milestoneCompleted: matchedMilestone ? matchedMilestone.title : null,
        error: {
            name: error.name,
            message: error.message,
            code: error.code || 'NO_CODE', // Nodemailer errors often have a 'code'
            // stack: error.stack // Include stack if you want full details
        },
      });
    }
  }

  res.json({
    message: "Event marked as attended.",
    milestoneCompleted: matchedMilestone ? matchedMilestone.title : null,
  });
};

export const generateReport = async (req, res) => {
  try {
    const now = new Date();

    // 1. Load all events
    const events = await eventModel.find().lean();

    // Separate past and future events
    const pastEvents = events.filter(e => new Date(e.endsAt) < now);
    const futureEvents = events.filter(e => new Date(e.startAt) >= now);

    // 2. Report for PAST EVENTS
    const pastEventReports = [];

    for (const event of pastEvents) {
      const participations = await EventParticipation.find({ eventId: event._id });

      const totalRegistered = participations.filter(p => p.status === "registered" || p.status === "attended").length;
      const totalAttended = participations.filter(p => p.status === "attended").length;
      const totalNoShow = totalRegistered - totalAttended;

      pastEventReports.push({
        eventId: event._id,
        title: event.title,
        startAt: event.startAt,
        endsAt: event.endsAt,
        totalRegistered,
        totalAttended,
        totalNoShow
      });
    }

    // 3. Report for FUTURE EVENTS
    const futureEventReports = [];

    for (const event of futureEvents) {
      const registeredCount = await EventParticipation.countDocuments({
        eventId: event._id,
        status: "registered"
      });

      futureEventReports.push({
        eventId: event._id,
        title: event.title,
        startAt: event.startAt,
        capacity: event.capacity,
        registeredCount
      });
    }

    // 4. Return final combined report
    return res.json({
      pastEvents: pastEventReports,
      upcomingEvents: futureEventReports
    });

  } catch (err) {
    console.error("Error generating engagement report:", err);
    res.status(500).json({ message: "Error generating report", err });
  }
};