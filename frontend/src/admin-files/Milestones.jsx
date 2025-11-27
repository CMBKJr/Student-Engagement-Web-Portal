import React, { useState, useEffect, useRef } from "react";
import "/src/admin.css";
import milestoneServices from "../api/milestoneServices";

export default function Milestones() {
  const [milestones, setMilestones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMilestone, setEditingMilestone] = useState(null);

  const dialogRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stage: "",
  });

  const loadForm = (m) => {
    setFormData({
      title: m?.title || "",
      description: m?.description || "",
      stage: m?.stage || "",
    });
  };

  const closeAndReset = () => {
    setEditingMilestone(null);
    loadForm(null);
    dialogRef.current.close();
  };

  const fetchMilestones = async () => {
    try {
      const res = await milestoneServices.getMilestones();
      setMilestones(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingMilestone) {
      await milestoneServices.updateMilestone(editingMilestone._id, formData);
    } else {
      await milestoneServices.createMilestone(formData);
    }

    closeAndReset();
    fetchMilestones();
  };

  const handleEdit = (m) => {
    setEditingMilestone(m);
    loadForm(m);
    dialogRef.current.showModal();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this milestone?")) return;

    try {
      await milestoneServices.deleteMilestone(id);
      fetchMilestones();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, []);

  const filteredMilestones = milestones.filter((m) => {
    const term = searchTerm.toLowerCase();
    return (
      m.title.toLowerCase().includes(term) ||
      m.description.toLowerCase().includes(term) ||
      m.stage.toLowerCase().includes(term)
    );
  });

  const milestonesToShow =
    searchTerm.trim() === "" ? milestones.slice(0, 3) : filteredMilestones;

  return (
    <div className="admin-content-page">
      <div className="grid">
        <div className="toolbar">
          <h1 className="page-title">Milestone Map</h1>
          <button
            className="primary"
            onClick={() => {
              setEditingMilestone(null);
              loadForm(null);
              dialogRef.current.showModal();
            }}
          >
            + Add Milestone
          </button>
        </div>

        <section className="grid cols-2">
          <div className="panel card">
            <div className="toolbar">
              <h2>Categories & Thresholds</h2>
              <button onClick={() => alert("Export CSV…")}>Export CSV</button>
            </div>


            <div className="toolbar" style={{ justifyContent: "flex-start" }}>
              <input
                className="input"
                placeholder="Search milestones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "260px" }}
              />
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Stage</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {milestonesToShow.map((m) => (
                  <tr key={m._id}>
                    <td>{m.title}</td>
                    <td>{m.description}</td>
                    <td>{m.stage}</td>
                    <td>
                      <a href="#" onClick={() => handleEdit(m)}>
                        Edit
                      </a>
                      {" | "}
                      <a href="#" onClick={() => handleDelete(m._id)}>
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}

                {searchTerm && milestonesToShow.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      style={{ textAlign: "center", color: "gray" }}
                    >
                      No milestones match your search.
                    </td>
                  </tr>
                )}
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

        <dialog
          ref={dialogRef}
          className="panel event-dia"
          style={{ padding: 0, maxWidth: "600px", width: "96%" }}
        >
          <form onSubmit={handleSubmit} method="dialog">
            <div
              className="card"
              style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
            >
              <div className="toolbar">
                <h2 style={{ margin: 0 }}>
                  {editingMilestone ? "Edit Milestone" : "New Milestone"}
                </h2>
              </div>

              <label>
                Title
                <input
                  className="input"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </label>

              <label>
                Description
                <textarea
                  className="input"
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </label>

              <label>
                Stage
                <input
                  className="input"
                  value={formData.stage}
                  onChange={(e) =>
                    setFormData({ ...formData, stage: e.target.value })
                  }
                />
              </label>

              <div className="toolbar">
                <div></div>
                <div
                  className="grid"
                  style={{ gridAutoFlow: "column", gap: ".5rem" }}
                >
                  <button
                    type="button"
                    className="ghost"
                    onClick={closeAndReset}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
}
