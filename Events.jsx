import React, { useRef } from "react";

export default function Events(){
  const dialogRef = useRef(null);
  const openModal = ()=> dialogRef.current?.showModal();
  const previewRSS = ()=> alert('TODO: server preview of RSS feed');
  const ingestRSS = ()=> alert('TODO: trigger /api/events/ingest');
  const sample = [
    ['2025-10-22 13:00','Cloud 101','Career','Career Starter','84'],
    ['2025-10-25 10:00','Resume Clinic','Career','Career Starter','65']
  ];
  return (
    <div className="grid">
      <div className="toolbar">
        <h1 classname="page-title">Events</h1>
        <div className="grid" style={{gridAutoFlow:'column',gap:'.5rem'}}>
          <button className="primary" onClick={openModal}>+ New Event</button>
          <button className="ghost" onClick={ingestRSS}>↻ Ingest from RSS</button>
        </div>
      </div>
      <section className="panel card">
        <div className="toolbar">
          <div className="grid" style={{gridAutoFlow:'column',gap:'.5rem'}}>
            <input className="input" placeholder="Filter by title/category…" aria-label="Filter events" />
            <select className="input"><option value="">All categories</option><option>Academic</option><option>Career</option><option>Community</option></select>
          </div>
          <div>
            <button onClick={()=>alert('Export CSV…')}>Export CSV</button>
          </div>
        </div>
        <table className="table" id="tbl-events">
          <thead><tr><th>When</th><th>Title</th><th>Category</th><th>Milestone Link</th><th>Check‑ins</th><th>Actions</th></tr></thead>
          <tbody>
            {sample.map((r,i)=>(
              <tr key={i}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td><a href="#" onClick={openModal}>Edit</a></td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <dialog ref={dialogRef} className="panel" style={{padding:0,maxWidth:'720px',width:'96%'}}>
        <form method="dialog">
          <div className="card" style={{display:'flex',gap:'1rem',flexDirection:'column'}}>
            <div className="toolbar"><h2 style={{margin:0}}>Event</h2><button className="ghost" value="close">✕</button></div>
            <div className="grid cols-2">
              <label>Title<input className="input" name="title" required /></label>
              <label>Date/Time<input className="input" name="when" required placeholder="YYYY‑MM‑DD HH:MM" /></label>
              <label>Location<input className="input" name="location" /></label>
              <label>Category<select className="input" name="category"><option>Academic</option><option>Career</option><option>Community</option></select></label>
            </div>
            <label>Associate Milestone<select className="input" name="milestone" data-source="/api/milestones"></select></label>
            <label>Description<textarea className="input" rows={6} name="description" /></label>
            <div className="toolbar">
              <div></div>
              <div className="grid" style={{gridAutoFlow:'column',gap:'.5rem'}}>
                <button className="bad" formNoValidate>Delete</button>
                <button className="primary">Save</button>
              </div>
            </div>
          </div>
        </form>
      </dialog>

      <section className="grid cols-2">
        <div className="panel card">
        <div className="toolbar"><h2>RSS Ingestion</h2>
          <p className="hint">Configured feed: <code>https://owllife.kennesaw.edu/organization/ccse/events.rss</code></p>
          <div className="toolbar"><button onClick={previewRSS}>Preview latest 20</button><div className="badge">Schedule: Daily 02:00</div></div>
          <table className="table"><thead><tr><th>When</th><th>Title</th><th>Link</th></tr></thead><tbody><tr><td>—</td><td>—</td><td>—</td></tr></tbody></table>
        </div>
        </div>
        <div className="panel card">
        <div className="toolbar"><h2>Check‑in Settings</h2>
          <label>Enable "I'm Here" check‑in window
            <select className="input" data-setting="checkin-window">
              <option value="15">15 min before → 30 min after</option>
              <option value="0">Only during event time</option>
            </select>
          </label>
          <hr />
          <label>QR Code Mode
            <select className="input" data-setting="qr-mode">
              <option value="dynamic">Dynamic per event</option>
              <option value="static">Static per semester</option>
            </select>
          </label>
        </div>
        </div>
      </section>
    </div>
  );
}
