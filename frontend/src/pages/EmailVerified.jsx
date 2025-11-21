import React from "react";
import { useNavigate, Link } from "react-router-dom";

const EmailVerified = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="header">
        <h1>
          Email Verified Succesfully!
          <br />
          <Link to={"/"}>
            <button>Login</button>
          </Link>
        </h1>
      </header>
    </div>
  );
};

export default EmailVerified;
