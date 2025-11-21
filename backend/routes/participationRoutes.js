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

router.post("/register", registerForEvent);

router.post("/unregister", unregisterFromEvent);

router.post("/markattended", markEventAsAttended);

router.get("/registered/:userId", getRegisteredEvents);

router.get("/attended/:userId", getAttendedEvents);

router.get("/generateReport", generateReport);

export default router