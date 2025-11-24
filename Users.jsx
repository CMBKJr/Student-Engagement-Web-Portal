import React from "react";

export default function Users(){
  return (
    <div className="grid">
      <div className="toolbar">
        <h1 className="page-title">Users</h1>
        <div><input className="input" placeholder="Search by name/email" /></div>
      </div>
      <section className="panel card">
        <table className="table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Badges</th><th>Last Active</th></tr></thead><tbody>
          <tr><td>Jane Doe</td><td>jdoe@students.kennesaw.edu</td><td>Student</td><td>2</td><td>2025-10-20</td></tr>
        </tbody></table>
      </section>
    </div>
  );
}
