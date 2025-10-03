import express from "express";
import { login, logout } from "../controller/authController.js";

const router = express.Router();

router.post("/", login);

router.post("/", logout);

export default router;
