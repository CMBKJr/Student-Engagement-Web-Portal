import express from "express";
import { login, refresh, logout, forgotPassword } from "../controller/authController.js";

const router = express.Router();

router.post("/", login);

router.post("/refresh", refresh);

router.post("/forgotPassword", forgotPassword);

router.post("/logout", logout);

export default router;
