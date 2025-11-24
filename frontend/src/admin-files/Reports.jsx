import React, { useState } from "react";
import "/src/admin.css";

export default function Reports() {
  const [groupBy, setGroupBy] = useState("overall");
  return (
    <div className="admin-content-page">
      <div className="grid">
        <div className="toolbar">
          <h1 className="page-title">Engagement Reports</h1>
          <div
            className="grid"
            style={{ gridAutoFlow: "column", gap: ".5rem" }}
          >
            <input className="input" type="date" />
            <input className="input" type="date" />
            <select
              className="input"
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
            >
              <option value="overall">Overall</option>
              <option value="event">By Event</option>
              <option value="category">By Category</option>
              <option value="milestone">By Milestone</option>
            </select>
            <button className="primary" onClick={() => {}}>
              Run
            </button>
          </div>
        </div>
        <section className="grid kpi">
          <div className="panel card kpi">
            <div className="hint">Total check‑ins</div>
            <div className="value">—</div>
          </div>
        </section>
        <section className="panel card" style={{ marginTop: "1rem" }}>
          <div className="toolbar">
            <h2 style={{ margin: 0 }}>Results</h2>
            <div
              className="grid"
              style={{ gridAutoFlow: "column", gap: ".5rem" }}
            >
              <button onClick={() => alert("Export CSV…")}>Export CSV</button>
              <button className="ghost" onClick={() => alert("Export PDF…")}>
                Export PDF
              </button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Events</td>
                <td>12</td>
              </tr>
              <tr>
                <td>Total Check‑ins</td>
                <td>320</td>
              </tr>
              <tr>
                <td>Unique Students</td>
                <td>210</td>
              </tr>
              <tr>
                <td>Avg Check‑in Rate</td>
                <td>62%</td>
              </tr>
            </tbody>
          </table>
          <p className="hint">
            PII: show student-level only when necessary for admin workflows;
            aggregate by default.
          </p>
        </section>
      </div>
    </div>
  );
}
