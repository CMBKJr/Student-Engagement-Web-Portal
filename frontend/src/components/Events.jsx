import { useState } from "react";
import { useEventContext } from "../contexts/EventContext";
import participationServices from "../api/participationServices";

function Events({ events }) {
  //const {isReg, addToReg, removeFromReg} = useEventContext()
  //const regEvent = isReg(events.id)

  //   function onRSVP() {
  //     // addToReg(events);
  //     try
  //   }
  const onRSVP = async () => {
    const userId = localStorage.getItem("LoggedInID");
    const eventId = events._id;
    if (!userId) {
      console.log("No user logged In");
    }

    try {
      const res = await participationServices.register({ userId, eventId });
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  //   function onFlyer(flyerName) {
  //     alert("View flyer");
  //   }

  const dateObj = new Date(events.startAt);
  const timeString = dateObj.toLocaleTimeString("en-US");
  const dateString = dateObj.toLocaleDateString("en-US");
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
        <div className="button-container">
          <button className={"rsvp-button"} onClick={onRSVP}>
            RSVP
          </button>
          <button className="view-flyer  tooltip">
            {/* <button className="view-flyer  tooltip" onClick={onFlyer}> */}
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
