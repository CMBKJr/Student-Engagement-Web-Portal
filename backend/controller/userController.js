import mongoose from "mongoose";
import { userModel } from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { transporter } from "../config/emailConfig.js";
import jwt from "jsonwebtoken";



// get all users
// get method
export const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find().select("-password").lean();

  if (!users) {
    return res.status(400).json({ message: "No users found" });
  }
  res.status(200).json(users);
});

// get one user
// get method
export const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ err: "Invalid Id" });
  }

  const user = await userModel.findById(id).select("-password").lean();

  if (!user) {
    return res.status(400).json({ message: "No user found" });
  }
  res.status(200).json(user);
});

// create user
// post method
export const createUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await userModel.findOne({ email }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    firstname,
    lastname,
    email,
    password: hashedPwd,
    isVerified: false,
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid user data received" });
  }

  const verificationToken = jwt.sign(
    { email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // const verificationLink = `${process.env.CLIENT_URL}/api/users/verify/${verificationToken}`;
  const verificationLink = `${process.env.SERVER_URL}/api/users/verify/${verificationToken}`;

  try {
    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Verify your email address",
      html: `
        <h3>Hello ${firstname},</h3>
        <p>Thanks for signing up! Please verify your email by clicking below:</p>
        <a href="${verificationLink}" 
          style="background:#007bff;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">Verify Email</a>
        <p>This link expires in 24 hours.</p>
      `,
    });

    res.status(201).json({
      message: `Account created for ${firstname}. Please check your email to verify your account.`,
    });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ message: "Error sending verification email." });
  }
});

// update user
// patch method
export const updateUser = asyncHandler(async (req, res) => {
  const {  email } = req.body;
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ err: "Invalid Id" });
  }

  //   const user = await userModel.findById(id).exec();

  const duplicate = await userModel.findOne({ email }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  const user = await userModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  res
    .status(200)
    .json({ user, message: `${user.firstname} ${user.lastname} updated` });
});

// delete user
// delete method
export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ err: "Invalid Id" });
  }

  const user = await userModel.findByIdAndDelete(id);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  res
    .status(200)
    .json({ user, message: `${user.firstname} ${user.lastname} deleted` });
});


// verify email
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await userModel.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(200).json({ message: "Email already verified" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

// login 
export const login = asyncHandler(async (req, res) => {})