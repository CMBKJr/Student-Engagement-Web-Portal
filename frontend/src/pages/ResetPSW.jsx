import React, { useState, useRef, useEffect, useContext} from 'react';
import logo from "../assets/KSULogo.png";
import { useNavigate} from "react-router-dom";


function ResetPSW() {
  const [email, setEmail] = useState("");
  // const [token, setToken] = useState(""); // reset token from email
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 🔒 Client-side check for matching passwords
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/resetPassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          // token,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      setSuccess("Password has been reset successfully!");
      setEmail("");
      // setToken("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
return (
    <div className="auth-container">
          <img src={logo} alt="KSU Logo" className="auth-logo" />
      <h2 style={{color:'white'}}>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* <input
        type="text"
        placeholder="Reset token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        required
      /> */}

      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
    </div>
  
);
}

export default ResetPSW;