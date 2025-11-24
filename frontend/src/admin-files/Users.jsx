import React, { useState, useEffect } from "react";
import "/src/admin.css";
import userServices from "../api/userServices";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const usersToView =
    search.length === 0
      ? users
      : users.filter(
          (user) =>
            user.firstname.toLowerCase().includes(search.toLowerCase()) ||
            user.lastname.toLowerCase().includes(search.toLowerCase())
        );
  let accountsToView = users.filter((a) =>
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
                {/* <th>Last Active</th> */}
              </tr>
            </thead>
            <tbody>
              {accountsToView.map((user) => (
                <tr key={user._id}>
                  <td>{`${user.firstname} ${user.lastname}`}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.completedMilestones.length}</td>
                  {/* <td>2025-10-20</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
