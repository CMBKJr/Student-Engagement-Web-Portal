import React, { useState } from 'react';
import logo from "../assets/KSULogo.png";
import { useNavigate} from "react-router-dom";



const MainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Main login:', { email, password });
    // Add login logic here
  };
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  

  return (
    <div className="auth-container">
      <img src={logo} alt="KSU Logo" className="auth-logo" />
      <h2>Student Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Login</button>
      </form>
      
      <p>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer", color: "#4f46e5", fontWeight: "500" }}
          >
            Sign up
          </span>
        </p>
      <p
        onClick={() => navigate("/forgot-password")}
        style={{ cursor: "pointer", color: "#4f46e5", marginTop: "0.5rem" }}
      >
        Forgot Password?
      </p>
      <div>
        <p
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            cursor: "pointer",
            color: "#4f46e5",
            fontWeight: "500",
            marginTop: "1rem",
          }}
        >
          Sign in as a different user {showDropdown ? "▲" : "▼"}
        </p>

        {showDropdown && (
          <div style={{ marginTop: "0.5rem" }}>
            <p
              onClick={() => navigate("/admin")}
              style={{ cursor: "pointer", color: "#111827" }}
            >
              Admin Login
            </p>
            <p
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", color: "#111827" }}
            >
              Student Login
            </p>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLogin;