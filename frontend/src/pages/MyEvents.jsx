import React from "react";
import Events from "../components/Events";
import eventServices from "../api/eventServices";
import participationServices from "../api/participationServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const userId = localStorage.getItem("LoggedInID");
  const dateObj = new Date(events.startAt);
  const timeString = dateObj.toLocaleTimeString("en-US");
  const dateString = dateObj.toLocaleDateString("en-US");

  const handeleUnregister = async (eventId) => {
    const userId = localStorage.getItem("LoggedInID");
    if (!userId) {
      console.log("No user logged In");
    }

    try {
      const res = await participationServices.unregister({ userId, eventId });
      console.log(res.data);
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleAttendance = async (eventId) => {
    const userId = localStorage.getItem("LoggedInID");
    if (!userId) {
      console.log("No user logged In");
    }

    try {
      const res = await participationServices.markAttendance({
        userId,
        eventId,
      });
      console.log(res.data);
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const res = await participationServices.getRegisteredEvents(userId);

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

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-container myevent-main">
        <header className="header">
          <h1>Registered Events</h1>
        </header>

        <main className="main">
          <section className="progress-section ">
            {events &&
              events.map((event) => (
                <div key={event.event._id} className="event-row">
                  <button onClick={() => handleAttendance(event.event._id)}>
                    Mark Attendance
                  </button>
                  <h3>{event.event.title}</h3>
                  <p>{event.event.description}</p>
                  <p>
                    &#128198;
                    {event.event.startAt && `${dateString} ${timeString}`}
                  </p>
                  <p>&#128205;{event.event.location}</p>
                  <div className="button-container">
                    <button
                      className={"rsvp-button"}
                      onClick={() => handeleUnregister(event.event._id)}
                    >
                      Unregister
                    </button>

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
              ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default MyEvents;
