import React from 'react';
import { Routes, Route } from "react-router-dom";
import MainLogin from './pages/MainLogin';
import AdminLogin from './pages/AdminLogin';
import SignUp from './pages/SignUp';
import ForgotPSW from './pages/ForgotPSW';
import Milestone from './pages/Milestone';
import Event from './pages/EventSite';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLogin />} />
        <Route path="/login" element={<MainLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password/:token" element={<ForgotPSW />} />
        <Route path="/milestone" element={<Milestone />} />
        <Route path="/event" element={<Event />} />
      </Routes>
    </Router>
  );
}

export default App;