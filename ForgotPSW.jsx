import React, { useState } from 'react';
import logo from "../assets/KSULogo.png";
import { useNavigate} from "react-router-dom";

function ForgotPSW() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("city");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Password validation rules
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z][A-Za-z\d@$!%*?&]{7,}$/;

  // Username format: first initial + full last name + MMYY
  const usernamePattern = /^[a-z][a-z]+[0-9]{4}$/i;

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email || !username || !securityAnswer || !newPassword) {
      setError("All fields are required.");
      return;
    }

    // Username validation
    if (!usernamePattern.test(username)) {
      setError("Invalid username format. Use first initial + last name + MMYY.");
      return;
    }

    // Password validation
    if (!passwordPattern.test(newPassword)) {
      setError(
        "Password must be at least 8 characters, start with a letter, and include a letter, number, and special character."
      );
      return;
    }

    try {
      // Look up user in Firestore
      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setError("User not found.");
        return;
      }

      const userData = userSnap.data();

      // Check email matches
      if (userData.email !== email) {
        setError("Email does not match our records.");
        return;
      }

      // Prevent reusing the old password
      const passwordMatch = await bcrypt.compare(newPassword, userData.password);
      if (passwordMatch) {
        setError("You cannot reuse your previous password.");
        return;
      }

      setError("");
      setSuccess("Your password has been reset successfully.");
    } catch (err) {
      console.error("❌ Error resetting password:", err);
      setError("Something went wrong. Please try again.");
    }
  };
return (
    <div className="auth-container">
          <img src={logo} alt="KSU Logo" className="auth-logo" />
      <h2>Forgot Password</h2>
      <form onSubmit={handleReset}>
        <input 
          type="text" 
          placeholder="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="NewPassword" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required 
          
        />
        <p
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", color: "#4f46e5", marginTop: "0.5rem" }}
      >
        <button type="submit">Submit</button>
      </p>
        
      </form>
    </div>
);
}

export default ForgotPSW;