import React from "react";
import Events from "../components/Events";
import eventServices from "../api/eventServices";
import participationServices from "../api/participationServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Attendance = () => {
  const [events, setEvents] = useState([]);
  const userId = localStorage.getItem("LoggedInID");

  const fetchData = async () => {
    try {
      const res = await participationServices.getAttendedEvents(userId);

      if (res.data) {
        console.log(res.data);
        setEvents(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (events.length == 0) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="page-container myevent-main">
          <header className="header">
            <h1>Attended Events</h1>
          </header>

          <main className="main">
            <section className="progress-section ">No Attended events</section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="page-container myevent-main">
        <header className="header">
          <h1>Attended Events</h1>
        </header>

        <main className="main">
          <section className="progress-section ">
            {events &&
              events.map((event) => {
                const dateObj = new Date(event.event.startAt);
                const timeString = dateObj.toLocaleTimeString("en-US");
                const dateString = dateObj.toLocaleDateString("en-US");
                return (
                  <div key={event.event._id} className="event-row">
                    <h3>{event.event.title}</h3>
                    <p>{event.event.description}</p>
                    <p>
                      &#128198;
                      {event.event.startAt && `${dateString} ${timeString}`}
                    </p>
                    <p>&#128205;{event.event.location}</p>
                    <div className="button-container">
                      <button className="view-flyer  tooltip">
                        View Flyer
                        <img
                          className="tooltiptext"
                          src={event.event.flyerUrl}
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Attendance;
