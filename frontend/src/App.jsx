import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLogin from "./pages/MainLogin";
import AdminLogin from "./pages/AdminLogin";
import SignUp from "./pages/SignUp";
import ForgotPSW from "./pages/ForgotPSW";
import Milestone from "./pages/Milestone";
import Event from "./pages/EventSite";
import ResetPSW from "./pages/ResetPSW";
import GenerateReport from "./pages/GenerateReport";
import EmailVerified from "./pages/EmailVerified";
import MyEvents from "./pages/MyEvents";
import Attendance from "./pages/Attendance";
import Profile from "./pages/Profile";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLogin />} />
        <Route path="/login" element={<MainLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPSW />} />
        <Route path="/milestone" element={<Milestone />} />
        <Route path="/resetPSW/:token" element={<ResetPSW />} />
        <Route path="/event" element={<Event />} />
        <Route path="/verify-email" element={<EmailVerified />} />
        <Route path="/generate-report" element={<GenerateReport />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
