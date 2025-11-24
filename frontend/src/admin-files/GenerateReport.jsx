import React, { useState, useEffect } from "react";
import generateReport from "../api/generateReport";
import "/src/admin.css";

export default function Reports() {
  const [groupBy, setGroupBy] = useState("overall");
  const [report, setReport] = useState(null);

  const fetchData = async () => {
    const res = await generateReport.getReport();
    if (res.data) setReport(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin-content-page">
      <div className="grid">
        {/* HEADER */}
        <div className="toolbar">
          <h1 className="page-title">Engagement Reports</h1>

          <div
            className="grid"
            style={{ gridAutoFlow: "column", gap: ".5rem" }}
          >
            {/* <input className="input" type="date" />
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
            </select> */}

            <button onClick={fetchData} className="primary">
             Refresh &#8635; 
            </button>
          </div>
        </div>

        {/* KPI SECTION */}
        {/* <section className="grid kpi">
          <div className="panel card kpi">
            <div className="hint">Total check-ins</div>
            <div className="value">—</div>
          </div>
        </section> */}

        {/* LOADING STATE (Styled properly) */}
        {!report && (
          <section className="panel card">
            <h2 style={{ margin: 0 }}>Generating report...</h2>

            <section className="panel card">
              <h2>Past Events</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Total Registration</th>
                    <th>Total Attendance</th>
                    <th>Total No Show</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </section>

            <section className="panel card">
              <h2>Upcoming Events</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Total Registration</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </section>
          </section>
        )}

        {/* ONLY render tables once report exists */}
        {report && (
          <>
            {/* PAST EVENTS */}
            <section className="panel card">
              <h2>Past Events</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Total Registration</th>
                    <th>Total Attendance</th>
                    <th>Total No Show</th>
                  </tr>
                </thead>
                <tbody>
                  {report.pastEvents.map((event, index) => (
                    <tr key={index}>
                      <td>{event.title }</td>
                      <td>{event.totalRegistered }</td>
                      <td>{event.totalAttended}</td>
                      <td>{event.totalNoShow }</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* UPCOMING EVENTS */}
            <section className="panel card">
              <h2>Upcoming Events</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Total Registration</th>
                  </tr>
                </thead>
                <tbody>
                  {report.upcomingEvents.map((event, index) => (
                    <tr key={index}>
                      <td>{event.title}</td>
                      <td>{event.registeredCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
