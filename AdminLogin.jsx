import React, { useState } from 'react';
import logo from "../assets/KSULogo.png";
import { useNavigate} from "react-router-dom";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    console.log('Admin login:', { adminId, password });
    // Add admin login logic here
  };

  return (
    <div className="auth-container">
          <img src={logo} alt="KSU Logo" className="auth-logo" />
      <h2>Admin Login</h2>
      <form onSubmit={handleAdminLogin}>
        <input 
          type="text" 
          placeholder="Admin ID" 
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLogin;