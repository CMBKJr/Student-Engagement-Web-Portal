import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "/src/admin.css";
import logo from "../assets/KSULogo-nav.png";

export default function AdminLayout() {
  const adminEmail = localStorage.getItem("LoggedInEmail");
  const [profileClick, setProfileClick] = useState(false);

  const picture = localStorage.getItem("LoggedInPicture");
  const userId = localStorage.getItem("LoggedInID");

  const handleProfileClick = (event) => {
    event.preventDefault();
    setProfileClick(!profileClick);
  };

  return (
    <div className="admin-page">
      <div className="admin-shell" data-role="Admin">
        <header className="admin-header">
          <div>
            Student Engagement • <strong>Admin</strong>
          </div>
          <div className="role" aria-live="polite">
            Signed in as{" "}
            <span data-admin-email>
              {adminEmail ? adminEmail : "admin@kennesaw.edu"}
            </span>
          </div>
        </header>
        <div className="admin-body">
          <nav className="admin-nav" aria-label="Admin Navigation">
            <div className="grid" style={{ gap: ".25rem" }}>
              <NavLink
                to="dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="events"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Events
              </NavLink>
              <NavLink
                to="milestones"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Milestones
              </NavLink>
              {/* <NavLink to="reports" className={({isActive})=> isActive?'active':''}>Reports</NavLink> */}
              <NavLink
                to="generate-report"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Reports
              </NavLink>
              <NavLink
                to="certificates"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Certificates & Badges
              </NavLink>
              <NavLink
                to="notifications"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Notifications
              </NavLink>
              <NavLink
                to="users"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Users
              </NavLink>
              <div className="profile-wrapper"  onClick={handleProfileClick}>
                <img className="nav-display-picture" src={picture} alt="" />
              </div>
            </div>
            {profileClick && (
              <ProfileIconMore
                onFileSelect={(file) => {
                  setSelectedFile(file);
                  handleImageUpload(file);
                }}
              />
            )}
            <img className="nav-logo" src={logo} alt="KSU Logo" />
          </nav>
          <main className="admin-main" role="main">
            <div className="admin-content">
              <Outlet />
              <div className="footer">© CCSE • Admin Console</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

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

  return (
    <>
      <div className="more-profile">
        <button onClick={logout} className="signout">
          Sign Out
        </button>
      </div>
    </>
  );
};
