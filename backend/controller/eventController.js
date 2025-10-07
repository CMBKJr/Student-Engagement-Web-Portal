import mongoose from "mongoose";
import { eventModel } from "../model/eventModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { transformRssToEventsArray } from "../transformRss.js";
import { transporter } from "../config/emailConfig.js";

const extractAndVerifyRole = (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return { role: null, id: null };
  }

  const token = authHeader.split(" ")[1];
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return {
      role: decoded.user.role,
      id: decoded.user.id,
    };
  } catch (error) {
    return { role: null, id: null };
  }
};

// get all events
// get method
export const getEvents = asyncHandler(async (req, res) => {
  const events = await eventModel.find().lean();

  if (!events) {
    return res.status(400).json({ message: "No events found" });
  }
  res.status(200).json(events);
});

// get one event
// get method
export const getEvent = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ err: "Invalid Id" });
  }

  const event = await eventModel.findById(id).lean();

  if (!event) {
    return res.status(400).json({ message: "No event found" });
  }
  res.status(200).json(event);
});

// create event
// post method
export const createEvent = asyncHandler(async (req, res) => {
  const user = extractAndVerifyRole(req, res);

  const {
    title,
    description,
    location,
    flyerUrl,
    startAt,
    endsAt,
    capacity,
    externalId,
  } = req.body;
  const event = await eventModel.create({
    title,
    description,
    location,
    flyerUrl,
    startAt,
    endsAt,
    capacity,
    externalId,
  });

  if (event) {
    res.status(201).json({ event, message: `New event: ${title} created` });
  } else {
    res.status(400).json({ message: "Invalid event data received" });
  }
});

// update event
// patch method
export const updateEvent = asyncHandler(async (req, res) => {
  const user = extractAndVerifyRole(req, res);

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ err: "Invalid Id" });
  }

  const event = await eventModel.findByIdAndUpdate(id, { ...req.body });
  if (!event) {
    return res.status(400).json({ message: "Event not found" });
  }

  res.status(200).json({ event, message: `${event.title} updated` });
});

// delete event
// delete method
export const deleteEvent = asyncHandler(async (req, res) => {
  const user = extractAndVerifyRole(req, res);

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ err: "Invalid Id" });
  }

  const event = await eventModel.findByIdAndDelete(id);
  if (!event) {
    return res.status(400).json({ message: "Event not found" });
  }

  res.status(200).json({ event, message: `${event.title} deleted` });
});

// export const ingestRss = asyncHandler(async (req, res) => {
//   const eventsFromRss = await transformRssToEventsArray();
//   let createdCount = 0;
//   let skippedCount = 0;

//   for (const eventData of eventsFromRss) {
//     if (!eventData.externalId) {
//       console.warn(
//         "Skipping event due to missing externalId in RSS item:",
//         eventData.title
//       );
//       skippedCount++;
//       continue;
//     }

//     const existingEvent = await eventModel.findOne({
//       externalId: eventData.externalId,
//     });

//     if (existingEvent) {
//       console.log(
//         `Event with externalId ${eventData.externalId} already exists. Skipping.`
//       );
//       skippedCount++;
//       continue;
//     }

//     try {
//       const {
//         title,
//         description,
//         location,
//         flyerUrl,
//         startAt,
//         endsAt,
//         capacity,
//         externalId,
//         categories,
//       } = eventData;

//       const newEvent = await eventModel.create({
//         title,
//         description,
//         location,
//         flyerUrl,
//         startAt,
//         endsAt,
//         capacity,
//         externalId,
//         categories,
//       });

//       if (newEvent) {
//         createdCount++;
//         console.log(`Successfully created new event: ${newEvent.title}`);
//       }
//     } catch (error) {
//       console.error(
//         `Error creating event ${eventData.title} with externalId ${eventData.externalId}:`,
//         error.message
//       );
//     }
//   }

//   try {
//     const today = new Date();
    
//     const todayString = today.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//     });

//     await transporter.sendMail({
//       from: `"Your App Name" <${process.env.EMAIL_USER}>`,
//       to: "ezeobiekene7@gmail.com",
//       subject: "RSS Daily Ingestion",
//       html: `
//           <h3>Hello Admin,</h3>
//           <p>RSS Ingestion for ${todayString} Complete. Created: ${createdCount}, Skipped: ${skippedCount}</p>
//         `,
//     });
//   } catch (error) {
//     console.error("Email send error:", error);
//   }

  
//   res.status(200).json({
//     message: "RSS Sync Complete.",
//     created: createdCount,
//     skipped: skippedCount,
//   });
// });
