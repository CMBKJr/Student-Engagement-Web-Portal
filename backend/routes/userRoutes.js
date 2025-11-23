import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  verifyEmail,
} from "../controller/userController.js";


const router = express.Router();

router.get("/", getUsers);

router.get("/verify/:token", verifyEmail);

router.get("/:id", getUser);

router.post("/", createUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);



export default router;
