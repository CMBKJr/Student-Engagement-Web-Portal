import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MainLogin from "./pages/MainLogin";
import AdminLogin from "./pages/AdminLogin";
import SignUp from "./pages/SignUp";
import ForgotPSW from "./pages/ForgotPSW";
import Milestone from "./pages/Milestone";
import Event from "./pages/EventSite";
import ResetPSW from "./pages/ResetPSW";
import GenerateReport from "./admin-files/GenerateReport";
import EmailVerified from "./pages/EmailVerified";
import MyEvents from "./pages/MyEvents";
import Attendance from "./pages/Attendance";
import Profile from "./pages/Profile";

//Admin imports
import AdminLayout from "./admin-files/AdminLayout";
import Certificates from "./admin-files/Certificates";
import Dashboard from "./admin-files/Dashboard";
import Events from "./admin-files/Events";
import Reports from "./admin-files/Reports";
import Users from "./admin-files/Users";
import Milestones from "./admin-files/Milestones";
import Notifications from "./admin-files/Notifications";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLogin />} />
        <Route path="/login" element={<MainLogin />} />
        {/* <Route path="/admin" element={<AdminLogin />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPSW />} />
        <Route path="/milestone" element={<Milestone />} />
        <Route path="/resetPSW/:token" element={<ResetPSW />} />
        <Route path="/event" element={<Event />} />
        <Route path="/verify-email/:token" element={<EmailVerified />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="certificates" element={<Certificates />} />
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="reports" element={<Reports />} />
          <Route path="generate-report" element={<GenerateReport />} />
          <Route path="users" element={<Users />} />
          <Route path="milestones" element={<Milestones />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
