import React, { useRef, useState, useEffect } from "react";
import "/src/admin.css";
import eventServices from "../api/eventServices";
import milestoneServices from "../api/milestoneServices";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const userRole = localStorage.getItem("LoggedInRole");
  const adminEmail = localStorage.getItem("LoggedInEmail");

  const dialogRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    startAt: "",
    location: "",
    description: "",
    flyerFile: null,
    categories: [],
    associatedMilestone: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const loadForm = (ev) => {
    setFormData({
      title: ev?.title || "",
      startAt: ev?.startAt
        ? new Date(ev.startAt).toISOString().slice(0, 16)
        : "",
      location: ev?.location || "",
      description: ev?.description || "",
      flyerFile: null,
      categories: ev?.categories || [],
      associatedMilestone: ev?.associatedMilestone || "",
    });
  };

  const closeAndReset = () => {
    setEditingEvent(null);
    loadForm(null);
    dialogRef.current.close();
  };

  const uploadImageToFirebase = async (file) => {
    const fileRef = ref(storage, `flyers/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const fetchEvents = async () => {
    try {
      const res = await eventServices.getAll();
      setEvents(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchMilestones = async () => {
    try {
      const res = await milestoneServices.getMilestones();
      setMilestones(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let flyerUrl = editingEvent?.flyerUrl || "";

    if (formData.flyerFile) {
      flyerUrl = await uploadImageToFirebase(formData.flyerFile);
    }

    const payload = {
      title: formData.title,
      startAt: new Date(formData.startAt),
      location: formData.location,
      description: formData.description,
      flyerUrl,
      categories: formData.categories,
      associatedMilestone: formData.associatedMilestone || null,
      role: userRole,
    };

    try {
      if (editingEvent) {
        await eventServices.updateEvent(editingEvent._id, payload);
      } else {
        await eventServices.create({ ...payload, userRole });
      }

      closeAndReset();
      fetchEvents();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await eventServices.getOne(id);
      setEditingEvent(res.data);
      loadForm(res.data);
      dialogRef.current.showModal();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await eventServices.deleteEvent(id, { role: userRole });
      fetchEvents();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  const ingestRSS = async () => {
    try {
      const res = await eventServices.ingest({ adminEmail });
      console.log(res.data);
      fetchEvents();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchMilestones();
  }, []);

  return (
    <div className="admin-content-page">
      <div className="grid">
        <div className="toolbar">
          <h1 className="page-title">Events</h1>
          <div
            className="grid"
            style={{ gridAutoFlow: "column", gap: ".5rem" }}
          >
            <button
              className="primary"
              onClick={() => {
                setEditingEvent(null);
                loadForm(null);
                dialogRef.current.showModal();
              }}
            >
              + New Event
            </button>
            <button className="ghost" onClick={ingestRSS}>
              ↻ Ingest from RSS
            </button>
          </div>
        </div>

        <section className="panel card">
          <div className="toolbar">
            <div
              className="grid"
              style={{ gridAutoFlow: "column", gap: ".5rem" }}
            >
              <input
                className="input"
                placeholder="Filter by title/category…"
                aria-label="Filter events"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="input"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All categories</option>
                <option>Academic</option>
                <option>Career</option>
                <option>Community</option>
                <option>ThoughtfulLearning</option>
              </select>
            </div>

            <div>
              <button onClick={() => alert("Export CSV…")}>Export CSV</button>
            </div>
          </div>

          <table className="table" id="tbl-events">
            <thead>
              <tr>
                <th>When</th>
                <th>Title</th>
                <th>Category</th>
                <th>Flyer</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {events
                .filter((ev) => {
                  const text = searchTerm.toLowerCase();
                  const matchesSearch =
                    ev.title.toLowerCase().includes(text) ||
                    ev.description?.toLowerCase().includes(text) ||
                    ev.location?.toLowerCase().includes(text);

                  const matchesCategory =
                    filterCategory === "" ||
                    ev.categories.includes(filterCategory);

                  return matchesSearch && matchesCategory;
                })
                .map((ev) => {
                  const dateString = new Date(ev.startAt).toLocaleDateString(
                    "en-US"
                  );

                  return (
                    <tr key={ev._id}>
                      <td>{dateString}</td>
                      <td>{ev.title}</td>
                      <td>{ev.categories?.[0]}</td>

                      <td>
                        {!!ev.flyerUrl && (
                          <button className="view-flyer tooltip">
                            View
                            <img
                              className="tooltiptext"
                              src={ev.flyerUrl}
                              alt=""
                            />
                          </button>
                        )}
                      </td>

                      <td>
                        <button
                          className="primary"
                          onClick={() => handleEdit(ev._id)}
                        >
                          Edit
                        </button>
                      </td>

                      <td>
                        <button
                          className="bad"
                          onClick={() => handleDelete(ev._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>

        <dialog
          ref={dialogRef}
          className="panel event-dia"
          style={{ padding: 0, maxWidth: "720px", width: "96%" }}
        >
          <form onSubmit={handleSubmit} method="dialog">
            <div
              className="card"
              style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
            >
              <div className="toolbar">
                <h2 style={{ margin: 0 }}>
                  {editingEvent ? "Edit Event" : "New Event"}
                </h2>
              </div>

              <div className="grid cols-2">
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
                  Date/Time
                  <input
                    type="datetime-local"
                    className="input"
                    required
                    value={formData.startAt}
                    onChange={(e) =>
                      setFormData({ ...formData, startAt: e.target.value })
                    }
                  />
                </label>

                <label>
                  Location
                  <input
                    className="input"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </label>

                <label>
                  Category
                  <select
                    className="input"
                    multiple
                    value={formData.categories}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categories: Array.from(
                          e.target.selectedOptions,
                          (o) => o.value
                        ),
                      })
                    }
                  >
                    <option value="Academic">Academic</option>
                    <option value="Career">Career</option>
                    <option value="Community">Community</option>
                    <option value="ThoughtfulLearning">
                      ThoughtfulLearning
                    </option>
                  </select>
                </label>
              </div>

              <label>
                Associate Milestone
                <select
                  className="input"
                  value={formData.associatedMilestone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      associatedMilestone: e.target.value,
                    })
                  }
                >
                  <option value="">None</option>
                  {milestones.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.title}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Description
                <textarea
                  className="input"
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </label>

              <label>
                Flyer Image
                <input
                  className="input"
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, flyerFile: e.target.files[0] })
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
                  <button className="primary" type="submit">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </dialog>

        <section className="grid cols-2">
          <div className="panel card">
            <div className="toolbar">
              <h2>RSS Ingestion</h2>
              <p style={{ color: "white" }} className="hint">
                Configured feed:
                <code>
                  {" "}
                  https://owllife.kennesaw.edu/organization/ccse/events.rss{" "}
                </code>
              </p>
              <div className="toolbar">
                <button onClick={() => alert("Preview…")}>
                  Preview latest 20
                </button>
                <div className="badge">Schedule: Daily 02:00</div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Title</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel card">
            <div className="toolbar">
              <h2>Check-in Settings</h2>
              <label>
                Enable "I'm Here" window
                <select className="input">
                  <option value="15">15 min before → 30 min after</option>
                </select>
              </label>
              <hr />
              <label>
                QR Code Mode
                <select className="input">
                  <option value="dynamic">Dynamic per event</option>
                </select>
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
