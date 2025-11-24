import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import userServices from "../api/userServices";
import logo from "../assets/KSULogo-nav.png";

const Navbar = () => {
  const [profileClick, setProfileClick] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const picture = localStorage.getItem("LoggedInPicture");
  const userId = localStorage.getItem("LoggedInID");

  const uploadImageToFirebase = async (file) => {
    const fileRef = ref(storage, `users/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  };

  const handleImageUpload = async (file) => {
    try {
      const imageUrl = await uploadImageToFirebase(file);
      const res = await userServices.updateUser(userId, {
        displayImageUrl: imageUrl,
      });

      console.log(res.data);

      localStorage.setItem("LoggedInPicture", imageUrl);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileClick = (event) => {
    event.preventDefault();
    setProfileClick(!profileClick);
  };

  return (
    <div>
      <nav className="event-nav navbar">
        <img className='nav-logo' src={logo} alt="KSU Logo" />

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
      {profileClick && (
        <ProfileIconMore
          onFileSelect={(file) => {
            setSelectedFile(file);
            handleImageUpload(file);
          }}
        />
      )}
    </div>
  );
};

const ProfileIconMore = ({ onFileSelect }) => {
  const [display, setDisplay] = useState(false);
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

  const handleDisplay = (event) => {
    event.preventDefault();
    setDisplay(!display);
  };

  return (
    <>
      <div className="more-profile">
        <span onClick={handleDisplay} className="ui-nav">
          Update Image
        </span>

        {display && (
          <input
            className="input-nav"
            type="file"
            accept="image/*"
            onChange={(e) => onFileSelect(e.target.files[0])}
          />
        )}

        <button onClick={logout} className="signout">
          Sign Out
        </button>
      </div>
    </>
  );
};

export default Navbar;
