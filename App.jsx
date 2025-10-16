import React from 'react';
import { Routes, Route } from "react-router-dom";
import MainLogin from './pages/MainLogin';
import AdminLogin from './pages/AdminLogin';
import SignUp from './pages/SignUp';
import ForgotPSW from './pages/ForgotPSW';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPSW />} />
      </Routes>
    </Router>
  );
}

export default App;