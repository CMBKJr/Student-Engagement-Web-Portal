import express from "express";
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controller/eventController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import multer from "multer";

// multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getEvents);

router.get("/:id", getEvent);

router.post("/", verifyJWT, upload.single("image"), createEvent);

router.patch("/:id", verifyJWT, upload.single("image"), updateEvent);

router.delete("/:id", verifyJWT, upload.single("image"), deleteEvent);

export default router;
