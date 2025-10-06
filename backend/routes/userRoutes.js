import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  verifyEmail,
  login,
} from "../controller/userController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
// import multer from "multer";

// multer setup
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", verifyJWT, getUsers);

router.get("/:id", verifyJWT, getUser);

router.post("/", createUser);

router.get("/verify/:token", verifyEmail);

router.patch("/:id", verifyJWT, updateUser);

router.delete("/:id", verifyJWT, deleteUser);

router.post("/login", login);

export default router;
