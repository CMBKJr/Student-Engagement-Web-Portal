import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [profileClick, setProfileClick] = useState(false);
  const picture = localStorage.getItem("LoggedInPicture");

  const handleProfileClick = (event) => {
    event.preventDefault();
    setProfileClick(!profileClick);
  };

  return (
    <div>
      <nav className="event-nav navbar">
        <p className="event-sep">Student Engagement Portal</p>
        <ul className="event-navlinks">
          <li>
            <Link to={"/event"}>Home</Link>
          </li>
          {/* <li>
            <Link to={"/event"}>All Events</Link>
          </li> */}
          <li>
            <Link to={"/myevents"}>MyEvents</Link>
          </li>
          <li>
            <Link to={"/attendance"}>Attendance</Link>
          </li>
          <li>
            <Link to={"/milestone"}>Milestone</Link>
          </li>
          <li className="profile-wrapper" onClick={handleProfileClick}>
            <img className="display-picture" src={picture} alt="" />
          </li>
        </ul>
        {/* <img src={picture} alt="" /> */}
      </nav>
      {profileClick && <ProfileIconMore />}
    </div>
  );
};

const ProfileIconMore = () => {
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate()
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

  const handleDisplay = (event) => {
    event.preventDefault();
    setDisplay(!display);
  };

  return (
    <>
      <div className="more-profile">
        <span onClick={handleDisplay} className="ui-nav">Update Image</span>

        {display && <input className="input-nav" type="file" name="" id="" />}

        <button onClick={logout} className="signout">
          Sign Out
        </button>
      </div>
    </>
  );
};

export default Navbar;
