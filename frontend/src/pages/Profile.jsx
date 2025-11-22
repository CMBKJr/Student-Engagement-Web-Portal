import React from "react";
import Navbar from "../components/Navbar";
import userServices from "../api/userServices";
import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("LoggedInID");

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
              <input type="file" name="picture" id="picture"/>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
