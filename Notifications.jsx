import React from "react";

export default function Notifications(){
  return (
    <div className="grid">
      <div className="toolbar">
        <h1 className="page-title">Notifications</h1>
      </div>
      <section className="grid cols-2">
        <div className="panel card">
          <div className="toolbar"><h2>Student Reminders</h2>
          <label>Upcoming event reminder
            <select className="input">
              <option value="24h">24 hours before</option>
              <option value="3h">3 hours before</option>
              <option value="off">Off</option>
            </select>
          </label>
          <label>Recommended events digest
            <select className="input">
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="off">Off</option>
            </select>
          </label>
        </div>
        </div>
        <div className="panel card">
          <div className="toolbar"><h2>Admin Alerts</h2>
          <label>Milestone reached alerts <input type="checkbox" defaultChecked /></label>
          <label>Low check‑in rate flag <input type="checkbox" /></label>
        </div>
        </div>
      </section>
      <section className="panel card" style={{ marginTop: "1rem" }}>
  <div className="toolbar">
    <h2 style={{ margin: 0 }}>Templates</h2>
    <button className="primary">Add Template</button>
  </div>

  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Audience</th>
        <th>Subject</th>
        <th>Body</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Event Reminder</td>
        <td>Students</td>
        <td><code>{'{event_title}'}</code></td>
        <td><code>{'{event_date}'}</code></td>
        <td><a href="#">Edit</a></td>
      </tr>
      <tr>
        <td>Milestone Achieved</td>
        <td>Admins</td>
        <td><code>{'{student_name}'}</code></td>
        <td><code>{'{milestone}'}</code></td>
        <td><a href="#">Edit</a></td>
      </tr>
    </tbody>
  </table>
</section>

    </div>
  );
}
