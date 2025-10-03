import { userModel } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  email = email.trim().toLowerCase();
  password = password.trim();

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await userModel.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res.status(401).json({ message: "Unauthorized" });
  }

 const accessToken = jwt.sign(
    {
      sub: String(foundUser._id),
      user: {
        id: String(foundUser._id),
        email: foundUser.email,
        role: foundUser.role ?? null,   
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({ accessToken });
});
export const logout = (_req, res) => {
  res.json({ message: "Logged out. Delete your token on the client." });
};
