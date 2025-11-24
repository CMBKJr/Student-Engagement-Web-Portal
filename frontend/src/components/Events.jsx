import { useState, useEffect } from "react";
import { useEventContext } from "../contexts/EventContext";
import participationServices from "../api/participationServices";

function Events({ events, engagedEventsTitle, onRefresh }) {
  const dateObj = new Date(events.startAt);
  const timeString = dateObj.toLocaleTimeString("en-US");
  const dateString = dateObj.toLocaleDateString("en-US");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const userId = localStorage.getItem("LoggedInID");

  const onRSVP = async () => {
    const eventId = events._id;
    if (!userId) {
      console.log("No user logged In");
    }

    try {
      const res = await participationServices.register({ userId, eventId });
      console.log(res.data);
      setMessage(res.data.message);

     if (onRefresh) onRefresh();


      setTimeout(function () {
        // console.log("waits 3 seconds.");
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log(error.message);
      setErr("Registration failed");
      setTimeout(function () {
        // console.log("waits 3 seconds.");
        setErr("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="event-row">
        <h4>{events.title}</h4>
        <p>{events.description}</p>
        <p>
          &#128198;
          {events.startAt && `${dateString} ${timeString}`}
        </p>
        <p>&#128205;{events.location}</p>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {err && <p style={{ color: "red" }}>{err}</p>}
        <div className="button-container">
          {!engagedEventsTitle.includes(events.title) && (
            <button className={"rsvp-button"} onClick={onRSVP}>
              RSVP
            </button>
          )}
          <button className="view-flyer  tooltip">
            View Flyer
            <img className="tooltiptext" src={events.flyerUrl} alt="" />
          </button>
        </div>
      </div>
      <br></br>
    </>
  );
}
export default Events;
