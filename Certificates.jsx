import React from "react";

export default function Certificates(){
  return (
    <div className="grid">
      <div className="toolbar">
        <h1 className="page-title">Certificates & Badges</h1>
        <button className="ok" onClick={()=>alert('Issue selected…')}>Issue Selected</button>
      </div>
      <section className="panel card">
        <div className="toolbar">
          <h2 style={{margin:0}}>Eligible Students</h2>
          <div className="grid" style={{gridAutoFlow:'column',gap:'.5rem'}}>
            <select className="input"><option value="">All milestones</option></select>
            <button onClick={()=>alert('Export CSV…')}>Export CSV</button>
          </div>
        </div>
        <table className="table">
          <thead><tr><th><input type="checkbox" /></th><th>Student</th><th>Milestone</th><th>Completed</th><th>Status</th></tr></thead>
          <tbody><tr><td><input type="checkbox" defaultChecked/></td><td>Jane Doe</td><td>Career Starter</td><td>2025-10-22</td><td><span className="badge ok">Eligible</span></td></tr></tbody>
        </table>
      </section>
      <section className="grid cols-2">
        <div className="panel card">
          <div className="toolbar"><h2>Certificate Template</h2>
          <label>Template<select className="input"></select></label>
          <label>Signature<select className="input"></select></label>
          <label>Delivery<select className="input"><option>Email (PDF)</option><option>Download only</option></select></label>
        </div>
        </div>
        <div className="panel card">
          <div className="toolbar"><h2>Badge Settings</h2>
          <label>Badge<select className="input"></select></label>
          <label>Issue as Open Badge (baked) <input type="checkbox" defaultChecked/></label>
        </div>
        </div>
      </section>
    </div>
  );
}
