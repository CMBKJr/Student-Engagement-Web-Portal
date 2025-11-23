import { userModel } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import asyncHandler from "express-async-handler";
import { transporter } from "../config/emailConfig.js";

export const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  email = email.trim().toLowerCase();
  password = password.trim();

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await userModel.findOne({ email }).exec();
  if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

  if (!foundUser.isVerified) {
    return res
      .status(401)
      .json({ message: "Please verify your email to login" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "Unauthorized" });

  // const accessToken = jwt.sign(
  //   {
  //     sub: String(foundUser._id),
  //     user: {
  //       id: String(foundUser._id),
  //       email: foundUser.email,
  //       role: foundUser.role ?? null,
  //     },
  //   },
  //   process.env.ACCESS_TOKEN_SECRET,
  //   { expiresIn: "15m" }
  // );

  // const refreshToken = jwt.sign(
  //   { email: foundUser.email },
  //   process.env.REFRESH_TOKEN_SECRET,
  //   { expiresIn: "7d" }
  // );

  // res.cookie("jwt", refreshToken, {
  //   httpOnly: true,
  //   secure: false,
  //   sameSite: "Lax",
  //   maxAge: 7 * 24 * 60 * 60 * 1000,
  // });

  // res.json({ accessToken });

  return res.status(200).json({
    message: "Login successful",
    user: {
      id: foundUser._id,
      picture: foundUser.displayImageUrl,
      firstname: foundUser.firstname,
      lastname: foundUser.lastname,
      email: foundUser.email,
      role: foundUser.role ?? null,
    }
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const foundUser = await userModel.findOne({ email: decoded.email }).exec();
    if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

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
      { expiresIn: "15m" }
    );

    return res.json({ accessToken });
  } catch (err) {
    console.error("JWT verify error:", err.message);
    return res.status(403).json({ message: "Forbidden" });
  }
});

export const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "Lax", secure: false });
  res.json({ message: "Cookie cleared" });
};

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email required" });

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(200).json({
      message: "If this email exists, a reset link has been sent.",
    });
  }

  // Generate token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token before saving (security)
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set reset token + expiration
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save();

  // Create reset URL
  const resetUrl = `${process.env.CLIENT_URL}/resetPSW/${resetToken}`;

  try {
    await transporter.sendMail({
      from: `"Student Engagement Web Portal " <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h3>Hello ${user.firstname},</h3>
        <p>You requested a password reset.</p>
        <p>Click the link below to set a new password:</p>

        <a href="${resetUrl}" 
          style="background:#007bff;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">
          Reset Password
        </a>

        <p>This link expires in 1 hour.</p>
      `,
    });

    res.json({ message: "Password reset link has been sent to your email." });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    console.log("Email send error:", error);
    res.status(500).json({ message: "Error sending reset email." });
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await userModel.findOne({ email }).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const hashedPwd = await bcrypt.hash(newPassword, 10);

  // user.password = hashedPwd;
  // await user.save();

  const updatedUser = await userModel.findByIdAndUpdate(
    user._id,
    { password: hashedPwd },
    { new: true }
  );

  res.status(200).json({
    updatedUser,
    message: `${user.firstname} ${user.lastname} password updated`,
  });
});
