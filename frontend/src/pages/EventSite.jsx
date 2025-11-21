import Notifications from "../components/Notifications";
import Events from "../components/Events";
import eventServices from "../api/eventServices";
import { useEventContext } from "../contexts/EventContext";
import { useEffect, useState } from "react";

function EventSite() {
  //const {isReg, addToReg, removeFromReg} = useEventContext()
  const [events, setEvents] = useState([]);

  const notification = [
    {
      id: 1,
      message: "Three days left to rsvp to the upcoming Hackathon event!",
    },
    { id: 2, message: "notification two" },
    { id: 3, message: "notification three" },
    { id: 4, message: "notification four" },
  ];

  const fetchData = async () => {
    try {
      const res = await eventServices.getAll();

      if (res.data) {
        setEvents(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="whiteBack">
        <nav>
          <p>Student Engagement Portal</p>
          <p>
            Home&nbsp;&nbsp;&nbsp;Events&nbsp;&nbsp;&nbsp;Attendance&nbsp;&nbsp;&nbsp;Profile
          </p>
          <p>Notifications</p>
          {notification.map((notification) => (
            <Notifications notification={notification} key={notification.id} />
          ))}
        </nav>
        <div className="Event-Wall">
          <h2>Registered Events</h2>
          <p>No registered events yet!</p>
          <h2>Upcoming Events</h2>
          {events.map((events, index) => (
            <Events events={events} key={events._id} />
          ))}
          <h2>Events</h2>
          <Events
            events={{
              id: 4,
              title: "Event 4",
              description: "eventdescr",
              location: "eventloca",
              date: "eventdate",
              time: "eventtime",
            }}
          ></Events>
          <button>View all Events</button>
        </div>
        <footer></footer>
      </div>
    </>
  );
}
export default EventSite;
