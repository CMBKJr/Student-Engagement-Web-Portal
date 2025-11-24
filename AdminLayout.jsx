import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./assets/admin.css";

export default function AdminLayout(){
  return (
    <div className="admin-shell" data-role="Admin">
      <header className="admin-header">
        <div>Student Engagement • <strong>Admin</strong></div>
        <div className="role" aria-live="polite">Signed in as <span data-admin-email>admin@kennesaw.edu</span></div>
      </header>
      <div className="admin-body">
        <nav className="admin-nav" aria-label="Admin Navigation">
          <div className="grid" style={{gap:'.25rem'}}>
            <NavLink to="dashboard" className={({isActive})=> isActive?'active':''}>Dashboard</NavLink>
            <NavLink to="events" className={({isActive})=> isActive?'active':''}>Events</NavLink>
            <NavLink to="milestones" className={({isActive})=> isActive?'active':''}>Milestones</NavLink>
            <NavLink to="reports" className={({isActive})=> isActive?'active':''}>Reports</NavLink>
            <NavLink to="certificates" className={({isActive})=> isActive?'active':''}>Certificates & Badges</NavLink>
            <NavLink to="notifications" className={({isActive})=> isActive?'active':''}>Notifications</NavLink>
            <NavLink to="users" className={({isActive})=> isActive?'active':''}>Users</NavLink>
          </div>
        </nav>
        <main className="admin-main" role="main">
          <div className="admin-content">
            <Outlet />
            <div className="footer">© CCSE • Admin Console</div>
          </div>
        </main>
      </div>
    </div>
  );
}
