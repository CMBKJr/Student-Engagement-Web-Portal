import React from "react";
import "/src/admin.css";

export default function Milestones() {
  return (
    // <div className="admin-page">
    <div className="admin-content-page">
      <div className="grid">
        <div className="toolbar">
          <h1 className="page-title">Milestone Map</h1>
          <button className="primary">+ Add Category</button>
        </div>
        <section className="grid cols-2">
          <div className="panel card">
            <div className="toolbar">
              <h2>Categories & Thresholds</h2>
              <button onClick={() => alert("Export CSV…")}>Export CSV</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Threshold (# events)</th>
                  <th>Badge</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Career</td>
                  <td>Career events attended</td>
                  <td>3</td>
                  <td>Career Star</td>
                  <td>
                    <a href="#">Edit</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="panel card">
            <h2>Event ↔ Milestone Association</h2>
            <p className="hint">
              Map event categories or specific events to milestone categories.
            </p>
            <div className="grid cols-2">
              <label>
                Event Category<select className="input"></select>
              </label>
              <label>
                Maps to Milestone<select className="input"></select>
              </label>
            </div>
            <div className="toolbar">
              <div></div>
              <button className="primary">Save Mapping</button>
            </div>
            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th>Event Category</th>
                  <th>Milestone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Career</td>
                  <td>Career Starter</td>
                  <td>
                    <a href="#">Remove</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="panel card">
          <h2>Badge Assets</h2>
          <p className="hint">
            Upload SVG/PNG to represent milestones. (Integrator handles upload)
          </p>
          <div className="grid cols-3">
            <label>
              Badge Name
              <input className="input" placeholder="e.g., Career Star" />
            </label>
            <label>
              File
              <input className="input" type="file" accept=".svg,.png" />
            </label>
            <div className="toolbar">
              <div></div>
              <button className="primary">Add Badge</button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Name</th>
                <th>Used By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>—</td>
                <td>Career Star</td>
                <td>Career</td>
                <td>
                  <a href="#">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
