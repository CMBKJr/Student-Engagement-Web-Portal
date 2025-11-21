import { useRef, useState, useEffect } from "react";
import logo from "../assets/KSULogo.png";
import { useNavigate } from "react-router-dom";
import userServices from "../api/userServices.js";

export default function SignUp() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Call backend API to create a user
  // const createUser = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch("http://localhost:8080/api/users/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(form),
  //     });

  //     if (!res.ok) {
  //       throw new Error("Failed to create user");
  //     }

  //     const data = await res.json();
  //     console.log("User created:", data);
  //     alert("User created successfully!");
  //     navigate ('/')
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error creating user.");
  //   }
  // };

  const createUser = async (e) => {
     e.preventDefault();
    try {
      const res = await userServices.create(form);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="KSU Logo" className="auth-logo" />

      <h2 style={{ color: "white" }}>Create Account</h2>
      <form onSubmit={createUser} style={{ maxWidth: "400px" }}>
        <input
          name="firstname"
          placeholder="First Name"
          value={form.firstname}
          onChange={handleChange}
        />

        <input
          name="lastname"
          placeholder="Last Name"
          value={form.lastname}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
