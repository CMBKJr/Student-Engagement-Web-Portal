import mongoose from "mongoose";
import { userModel } from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

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

  const userObject = { firstname, lastname, email, password: hashedPwd };

  const user = await userModel.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

// update user
// patch method
export const updateUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email } = req.body;
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ err: "Invalid Id" });
  }

  //   const user = await userModel.findById(id).exec();

  const duplicate = await userModel.findOne({ email }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  const user = await userModel.findByIdAndUpdate(id, { ...req.body });
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


// login 
export const login = asyncHandler(async (req, res) => {})