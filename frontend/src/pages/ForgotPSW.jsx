import React, { useState, useRef, useEffect, useContext } from "react";
import logo from "../assets/KSULogo.png";
import { useNavigate } from "react-router-dom";

export default function EmailSender() {
  const [email, setEmail] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const naigate = useNavigate()

  const sendEmailToBackend = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setResponseMsg(data.message || "Success!");

      
    } catch (err) {
      console.error("Error sending email:", err);
      setResponseMsg("Error sending email");
    }
  };
  return (
    <div className="auth-container">
      <img src={logo} alt="KSU Logo" className="auth-logo" />

      <h2 style={{ color: "white" }}>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={sendEmailToBackend}>Send</button>

      {responseMsg && <p>{responseMsg}</p>}
    </div>
  );
}
