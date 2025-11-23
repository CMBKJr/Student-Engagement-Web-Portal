import Notifications from "../components/Notifications";
import Events from "../components/Events";
import eventServices from "../api/eventServices";
import { useEventContext } from "../contexts/EventContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

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

  if (events.length == 0) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="page-container events-page">
          <main className="events-main progress-section">
            <div>
              <header className="header">
                <h2>Upcoming Events</h2>
              </header>

              <p>No Upcoming Events</p>
            </div>

            <article className="notification">
              <p>Notifications</p>
              {notification.map((notification) => (
                <Notifications
                  notification={notification}
                  key={notification.id}
                />
              ))}
            </article>
          </main>

          <footer></footer>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-container events-page">
        <main className="events-main progress-section">
          <div>
            <header className="header">
              <h2>Upcoming Events</h2>
            </header>

            {events.map((events, index) => (
              <Events events={events} key={events._id} />
            ))}

            <button>View all Events</button>
          </div>

          <article className="notification">
            <p>Notifications</p>
            {notification.map((notification) => (
              <Notifications
                notification={notification}
                key={notification.id}
              />
            ))}
          </article>
        </main>

        <footer></footer>
      </div>
    </div>
  );
};
export default EventSite;
