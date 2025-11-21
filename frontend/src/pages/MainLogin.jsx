import React, { useState, useRef, useEffect, useContext } from "react";
import logo from "../assets/KSULogo.png";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthProvider";
import userServices from "../api/userServices";

import axios from "../api/axios";

const LOGIN_URL = "/auth";

const MainLogin = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userServices.login({
        email,
        password,
      });
      if(res.data.user) {
        localStorage.setItem('LoggedInFirstName', res.data.user.firstname);
        localStorage.setItem('LoggedInID', res.data.user.id);
        localStorage.setItem('LoggedInRole', res.data.user.role);
        localStorage.setItem('LoggedInEmail', res.data.user.email);
        localStorage.setItem('LoggedInLastName', res.data.user.lastname);
      }
      console.log(res.data);
      navigate("/event");
    } catch (error) {
      console.log(error.message);
    }

    // try {
    //   const response = await axios.post(
    //     LOGIN_URL,
    //     JSON.stringify({ email, password }),
    //     {
    //       headers: { "Content-Type": "application/json" },
    //       withCredentials: true,
    //     }
    //   );
    //   console.log(JSON.stringify(response?.data));

    //   const accessToken = response?.data?.accessToken;
    //   const roles = response?.data?.roles;
    //   setAuth({ email, password, roles, accessToken });
    //   setEmail("");
    //   setPassword("");
    //   navigate("/forgot-password");
    // } catch (err) {
    //   if (!err?.response) {
    //     setErrMsg("No Server Response");
    //   } else if (err.response?.status === 400) {
    //     setErrMsg("Missing Username or Password");
    //   } else if (err.response?.status === 401) {
    //     setErrMsg("Unauthorized");
    //   } else {
    //     setErrMsg("Login Failed");
    //   }
    //   errRef.current.focus();
    // }
  };

  return (
    <div className="auth-container">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <img src={logo} alt="KSU Logo" className="auth-logo" />

      <h2 style={{ color: "white" }}>Student Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="email"
          placeholder="Email"
          ref={userRef}
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          ref={userRef}
          value={password}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p style={{ color: "white" }}>
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
