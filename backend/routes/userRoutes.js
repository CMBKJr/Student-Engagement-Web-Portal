import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
} from "../controller/userController.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", createUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/login", login);

export default router;
