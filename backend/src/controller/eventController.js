import mongoose from "mongoose";
import { eventModel } from "../model/eventModel.js";
import asyncHandler from "express-async-handler";

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
export const createEvents = asyncHandler(async (req, res) => {
  const {
    title,
    desciption,
    location,
    flyerUrl,
    startsAt,
    endsAt,
    capacity,
    createdByUserId,
  } = req.body;
  const event = await eventModel.create({
    title,
    desciption,
    location,
    flyerUrl,
    startsAt,
    endsAt,
    capacity,
    createdByUserId,
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
