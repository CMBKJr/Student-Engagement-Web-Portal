import Notifications from "../components/Notifications";
import Events from "../components/Events";
import eventServices from "../api/eventServices";
import { useEventContext } from "../contexts/EventContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EventSite = () => {
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
    <div className="whiteBack events-page">
      <nav className="event-nav">
        <p className="event-sep">Student Engagement Portal</p>
        <ul className="event-navlinks">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/"}>Events</Link>
          </li>
          <li>
            <Link to={"/"}>Attendance</Link>
          </li>
          <li>
            <Link to={"/"}>Profile</Link>
          </li>
        </ul>
      </nav>
      <main className="events-main">
        <div>
          {/* <div className="Event-Wall"> */}
          <h2>Registered Events</h2>
          <p>No registered events yet!</p>
          <h2>Upcoming Events</h2>
          {events.map((events, index) => (
            <Events events={events} key={events._id} />
          ))}

          <button>View all Events</button>
        </div>

        <article className="notification">
          <p>Notifications</p>
          {notification.map((notification) => (
            <Notifications notification={notification} key={notification.id} />
          ))}
        </article>
      </main>

      <footer></footer>
    </div>
  );
};
export default EventSite;
