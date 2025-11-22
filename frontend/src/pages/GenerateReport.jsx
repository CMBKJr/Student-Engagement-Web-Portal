import React from "react";
import { useState, useEffect } from "react";
import generateReport from "../api/generateReport";
import Navbar from "../components/Navbar";

const GenerateReport = () => {
  const [report, setReport] = useState();

  const fetchData = async () => {
    const res = await generateReport.getReport();
    console.log(res.data);
    if (res.data) {
      setReport(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!report) {
    return (
      <div className="page-container">
        <header className="header">
          <h1>
            Generate Student Engagement Report
            <p>Track students engagement trends</p>
          </h1>
        </header>

        <main className="main">
          <section className="progress-section">Loading...</section>
        </main>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-container">
        <header className="header">
          <h1>
            Generate Student Engagement Report
            <p>Track students engagement trends</p>
          </h1>
        </header>

        <main className="main">
          <section className="progress-section">
            <h2 className="generate-h2">Past Events</h2>

            <table className="generate-table">
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
                    <td>{event.title}</td>
                    <td>{event.totalRegistered}</td>
                    <td>{event.totalAttended}</td>
                    <td>{event.totalNoShow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <br />

          <section className="progress-section">
            <h2 className="generate-h2">Upcoming Events</h2>

            <table className="generate-table">
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
        </main>
      </div>
    </div>
  );
};

export default GenerateReport;
