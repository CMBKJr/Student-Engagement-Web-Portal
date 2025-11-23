import React from "react";
import Navbar from "../components/Navbar";
import userServices from "../api/userServices";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("LoggedInID");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // const res = await userServices.logout();

      localStorage.removeItem("LoggedInEmail");
      localStorage.removeItem("LoggedInFirstName");
      localStorage.removeItem("LoggedInLastName");
      localStorage.removeItem("LoggedInID");
      localStorage.removeItem("LoggedInPicture");
      localStorage.removeItem("LoggedInRole");

      console.log("Logout Successfull");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      let res = await userServices.getOne(userId);
      if (res.data) {
        console.log(res.data);
        setUser(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="page-container myevent-main">
        <header className="header">
          <h1>Hello, {user.firstname}!</h1>
        </header>
        <main className="main">
          <section className="progress-section ">
            <form action="">
              <input type="text" name="" id="" />
              <input type="text" name="" id="" />
              <input type="text" name="" id="" />
              <input type="text" name="" id="" />
              <input type="text" name="" id="" />
              <label htmlFor="picture">Update Profile Picture</label>
              <input type="file" name="picture" id="picture" />
            </form>

            <button onClick={logout}>Log out</button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
