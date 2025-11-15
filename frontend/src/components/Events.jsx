import { useState } from "react";
import {useEventContext} from "../contexts/EventContext"
function Events({events}) {
//const {isReg, addToReg, removeFromReg} = useEventContext()
//const regEvent = isReg(events.id)

    function onRSVP() {
        addToReg(events)
    }
    function onFlyer(flyerName) {
        alert("View flyer")
    }
    return (
        <>
 <div style={{border: '1px solid lightgray', textAlign:"left", fontSize: '13px', width: '1000px', marginRight: '800px', borderRadius:'10px'}} className="event-row">
            <h4>{events.title}</h4>
            <p>{events.description}</p>
            <p>&#128198;{events.date} @ {events.time}</p>  
                <p>&#128205;{events.location}</p>
                <div className="button-container" style={{display: "flex", gap:'10px', marginLeft:'700px', marginBottom: '10px'}}>
            <button style={{backgroundColor:'gold', color:'black'}}className={"rsvp-button"} onClick={onRSVP}>
                RSVP
            </button>
            <button style={{backgroundColor:'black', color:'white'}}className="view-flyer" onClick={onFlyer}>View Flyer</button>
        </div>
        </div>
        <br>
        </br>
        
    </>
    )
}
export default Events;