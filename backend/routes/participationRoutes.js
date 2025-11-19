import express from "express";
import {
  registerForEvent,
  getAttendedEvents,
  getRegisteredEvents,
  unregisterFromEvent,
  markEventAsAttended,
  generateReport
} from "../controller/participationController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router()

router.post("/register", verifyJWT, registerForEvent);

router.post("/unregister", verifyJWT, unregisterFromEvent);

router.post("/markattended", verifyJWT, markEventAsAttended);

router.get("/registered/:userId", verifyJWT, getRegisteredEvents);

router.get("/attended/:userId", verifyJWT, getAttendedEvents);

router.get("/generateReport", generateReport);

export default router