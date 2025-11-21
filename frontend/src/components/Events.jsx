import { useState } from "react";
import { useEventContext } from "../contexts/EventContext";
function Events({ events }) {
  //const {isReg, addToReg, removeFromReg} = useEventContext()
  //const regEvent = isReg(events.id)

  function onRSVP() {
    addToReg(events);
  }
  function onFlyer(flyerName) {
    alert("View flyer");
  }
  return (
    <>
      <div className="event-row">
        <h4>{events.title}</h4>
        <p>{events.description}</p>
        <p>
          &#128198;{events.date} @ {events.time}
        </p>
        <p>&#128205;{events.location}</p>
        <div className="button-container">
          <button className={"rsvp-button"} onClick={onRSVP}>
            RSVP
          </button>
          <button className="view-flyer" onClick={onFlyer}>
            View Flyer
          </button>
        </div>
      </div>
      <br></br>
    </>
  );
}
export default Events;
