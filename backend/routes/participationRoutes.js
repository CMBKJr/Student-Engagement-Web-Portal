import express from "express";
import {
  registerForEvent,
  getAttendedEvents,
  getRegisteredEvents,
  unregisterFromEvent,
} from "../controller/participationController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router()

router.post("/register", verifyJWT, registerForEvent);

router.post("/unregister", verifyJWT, unregisterFromEvent);

router.get("/registered/:id", verifyJWT, getRegisteredEvents);

router.get("/attended/:id", verifyJWT, getAttendedEvents);

export default router