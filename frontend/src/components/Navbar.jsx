import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const picture = localStorage.getItem('LoggedInPicture')
  return (
    <div>
      <nav className="event-nav navbar">
        <p className="event-sep">Student Engagement Portal</p>
        <ul className="event-navlinks">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/event"}>All Events</Link>
          </li>
          <li>
            <Link to={"/myevents"}>MyEvents</Link>
          </li>
          <li>
            <Link to={"/attendance"}>Attendance</Link>
          </li>
          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
         
        </ul> 
        {/* <img src={picture} alt="" /> */}
      </nav>
    </div>
  );
};

export default Navbar;
