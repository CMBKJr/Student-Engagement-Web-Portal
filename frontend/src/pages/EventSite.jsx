import Notifications from '../components/Notifications';
import Events from '../components/Events'
import { useEventContext } from '../contexts/EventContext';
function EventSite () {
    //const {isReg, addToReg, removeFromReg} = useEventContext()
    const events = [
        {id: 1, title: "Hackathon", description:"stuff stuff stuff", location:"Marietta", date: "September 9th", time: "6:00 pm"},
         {id: 2, title: "Hide N' Seek", description:"stuff stuff stuff", location:"Marietta", date: "September 22nd", time: "10:00 pm"},
         {id: 3, title:'Event 3', description:'eventdescr', location:"eventloca", date:"eventdate", time:"eventtime"}
        ]
        const notification = [
            {id:1, message:"Three days left to rsvp to the upcoming Hackathon event!"},
            {id: 2, message:"notification two"},
            {id: 3, message:"notification three"},
            {id:4, message:"notification four"}
        ]

return (
    <>
    <div className = "whiteBack">
    <nav style={{border: '1px solid lightgray', height:'120px'}}>
    <p style= {{marginRight:'1000px', fontSize:'20px', marginBottom: '35px', fontWeight: 'bold', letterSpacing: '2px', color: 'black'}}>Student Engagement Portal</p>
       <p style={{marginBottom: '80px', marginLeft:'1020px'}}>
        Home&nbsp;&nbsp;&nbsp;Events&nbsp;&nbsp;&nbsp;Attendance&nbsp;&nbsp;&nbsp;Profile
        </p>
            <p style= {{marginLeft:'1100px', fontSize:'25px'}}>Notifications</p>
        {notification.map(notification => <Notifications notification={notification}
        key={notification.id}/>)}
    </nav>
    <div className='Event-Wall' style={{}}>
        <h2 style={{marginRight: '1070px'}}>Registered Events</h2>   
         <p>No registered events yet!</p>
        <h2 style={{marginRight: '1070px'}}>Upcoming Events</h2>
        {events.map(events => <Events events={events}
        key={events.id}/>)}
        <h2 style={{marginRight: '1195px'}}>Events</h2>
            <Events events = {{id: 4, title:'Event 4', description:'eventdescr', location:"eventloca", date:"eventdate", time:"eventtime"}}></Events>
                <button style ={{marginRight:"150px", color: 'white', backgroundColor:'black'}}>View all Events</button>
</div>
<footer style={{textAlign:'left', color:'white', backgroundColor:'black'}}>

</footer>
    </div>
    </>
)
}
export default EventSite;
