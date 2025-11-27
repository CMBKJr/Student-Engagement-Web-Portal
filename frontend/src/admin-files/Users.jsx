import React, { useState, useEffect } from "react";
import "/src/admin.css";
import userServices from "../api/userServices";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const userID = localStorage.getItem("LoggedInID");

  const fetchData = async () => {
    try {
      const res = await userServices.getAll();
      if (res.data) {
        setUsers(res.data);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const stripAdmin = async (id) => {
    try {
      const res = await userServices.updateUser(id, { role: "student" });
      if (res.data) console.log(res.data);
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const makeAdmin = async (id) => {
    try {
      const res = await userServices.updateUser(id, { role: "admin" });
      if (res.data) console.log(res.data);
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  let usersToView = users.filter((a) =>
    search.length === 0
      ? true
      : a.firstname.toLowerCase().includes(search.toLowerCase()) ||
        a.lastname.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="admin-content-page">
      <div className="grid">
        <div className="toolbar">
          <h1 className="page-title">Users</h1>
          <div>
            <input
              type="search"
              name="users"
              id="users"
              onChange={handleSearch}
              className="input"
              placeholder="Search by name/email"
            />
          </div>
        </div>
        <section className="panel card">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Completed Milestones</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersToView.map((user) => (
                <tr key={user._id}>
                  <td>{`${user.firstname} ${user.lastname}`}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role === "admin"
                      ? ""
                      : user.completedMilestones.length}
                  </td>
                  <td>
                    {user._id === userID ? (
                      ""
                    ) : user.role === "student" ? (
                      <button onClick={() => makeAdmin(user._id)}>
                        Make Admin
                      </button>
                    ) : (
                      <button onClick={() => stripAdmin(user._id)}>
                        Strip Privilege
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
