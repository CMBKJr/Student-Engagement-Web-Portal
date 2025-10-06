// import { userModel } from "../model/userModel.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";

// export const login = asyncHandler(async (req, res) => {
//   let { email, password } = req.body;

//   email = email.trim().toLowerCase();
//   password = password.trim();

//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const foundUser = await userModel.findOne({ email }).exec();

//   if (!foundUser) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   if (!foundUser.isVerified) {
//     return res
//       .status(401)
//       .json({ message: "Please verify your email to login" });
//   }

//   const match = await bcrypt.compare(password, foundUser.password);
//   if (!match) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const accessToken = jwt.sign(
//     {
//       sub: String(foundUser._id),
//       user: {
//         id: String(foundUser._id),
//         email: foundUser.email,
//         role: foundUser.role ?? null,
//       },
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: "15m" }
//   );

//   const refreshToken = jwt.sign(
//     { email: foundUser.email },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: "7d" }
//   );

//   res.cookie("jwt", refreshToken, {
//     httpOnly: true,
//     secure: false,
//     // secure: true,
//     // sameSite: "None",
//     sameSite: "Lax",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });

//   res.json({ accessToken });
// });

// export const refresh = (req, res) => {
//   const cookies = req.cookies;

//   if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

//   const refreshToken = cookies.jwt;

//   jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_SECRET,
//     asyncHandler(async (err, decoded) => {
//       if (err) return res.status(403).json({ message: "Forbidden" });

//       const foundUser = await userModel.findOne({
//         email: decoded.email,
//       }).exec();

//       if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

//       const accessToken = jwt.sign(
//         {
//           sub: String(foundUser._id),
//           user: {
//             id: String(foundUser._id),
//             email: foundUser.email,
//             role: foundUser.role ?? null,
//           },
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: "15m" }
//       );

//       res.json({ accessToken });
//     })
//   );
// };

// export const logout = (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.sendStatus(204); //No content
//   res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
//   res.json({ message: "Cookie cleared" });
// };


import { userModel } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// -------------------- LOGIN --------------------
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
    return res.status(401).json({ message: "Please verify your email to login" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "Unauthorized" });

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

  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // ✅ Use secure: false for local testing
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
});

// -------------------- REFRESH --------------------
export const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  try {
    // ✅ Verify token directly — no asyncHandler inside
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

// -------------------- LOGOUT --------------------
export const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content

  // ✅ Match your local settings (secure: false)
  res.clearCookie("jwt", { httpOnly: true, sameSite: "Lax", secure: false });
  res.json({ message: "Cookie cleared" });
};
