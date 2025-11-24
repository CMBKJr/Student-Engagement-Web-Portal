import express from "express";
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controller/eventController.js";
import { ingestRssAlone } from "../transformRss.js";
// import { verifyJWT } from "../middleware/verifyJWT.js";
// import multer from "multer";

// multer setup
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getEvents);

router.get("/:id", getEvent);

router.post("/", createEvent);

router.post("/ingest", ingestRssAlone);

router.patch("/:id", updateEvent);

router.delete("/:id",  deleteEvent);

export default router;
