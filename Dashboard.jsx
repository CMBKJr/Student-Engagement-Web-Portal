import React from "react";

export default function Dashboard(){
  const upcoming = [
    {when:'Tue 10/28 3:30p', title:'Tech Talk: Cloud 101', cat:'Career'},
    {when:'Thu 10/30 1:00p', title:'Advising Q&A', cat:'Academic'}
  ];
  return (
    <div className="grid">
      <div className="toolbar">
        <h1 className="page-title">Dashboard</h1>
      </div>
      <section className="grid kpi">
        <div className="panel card kpi"><div className="hint">Events this week</div><div className="value">—</div></div>
        <div className="panel card kpi"><div className="hint">Unique student attendees (30d)</div><div className="value">—</div></div>
        <div className="panel card kpi"><div className="hint">Avg. check‑in rate</div><div className="value">—</div></div>
        <div className="panel card kpi"><div className="hint">Milestones earned (30d)</div><div className="value">—</div></div>
      </section>
      <section className="grid cols-2">
        <div className="panel card">
          <div className="toolbar">
            <h2 style={{margin:0}}>Upcoming events</h2>
            <a className="badge" href="#/admin/events">Manage →</a>
          </div>
          <table className="table">
            <thead><tr><th>When</th><th>Title</th><th>Category</th><th>Actions</th></tr></thead>
            <tbody>
              {upcoming.map((e,i)=>(
                <tr key={i}><td>{e.when}</td><td>{e.title}</td><td>{e.cat}</td><td><a href="#/admin/events">Open</a></td></tr>
              ))}
            </tbody>
          </table>
          <div className="hint" style={{marginTop:'.5rem'}}>Data ingested daily from RSS + manual adds.</div>
        </div>
        <div className="panel card">
          <div className="toolbar"><h2 style={{margin:0}}>Milestone alerts</h2><a className="badge" href="#/admin/certificates">Issue certificates →</a></div>
          <ul style={{margin:0,paddingLeft:'1rem'}}>
            <li>—</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
