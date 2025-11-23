import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userServices from "../api/userServices";
import { useParams } from "react-router-dom";

const EmailVerified = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const { token } = useParams();

  const verify = async () => {
    try {
      const res = await userServices.verifyEmail(token);

      console.log(res.data.message);
      setMessage(res.data.message);
    } catch (error) {
      console.log(error.message);
      setErr(error.message)
    }
  };

  useEffect(() => {
    verify();
  });

  return (
    <div>
      <header className="header">
        {message && (
          <h1>
            {message}!
            <br />
            <Link to={"/"}>
              <button>Login</button>
            </Link>
          </h1>
        )}
        {err && (
          <h1>
            {err}
            <br />
            {/* <Link to={"/"}>
              <button>Login</button>
            </Link> */}
          </h1>
        )}
      </header>
    </div>
  );
};

export default EmailVerified;
