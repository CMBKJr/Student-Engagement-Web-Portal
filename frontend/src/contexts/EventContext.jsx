import {createContext, useState, useContext, useEffect} from "react"


const EventContext = createContext()
export const useEventContext = () => useContext(EventContext)
export const EventProvider = ({children}) => {
const [regEvent, setRegEvent] = useState([])

useEffect(() => {
    const storedReg = localStorage.getItem("regEvent")
    if(storedReg) setRegEvent(JSON.parse(storedReg))
},[])

useEffect(() => {
    localStorage.setItem("regEvent", JSON.stringify(regEvent))
},[regEvent])

const addToReg = (events) => {
    setRegEvent(prev => [...prev, events])
}
const removeFromReg = (eventsId) => {
    setRegEvent(prev => prev.filter(events =>  events.id !== eventsId))
}
const isReg = (eventsId) => {
    return regEvent.some(events => events.id === eventsId) 
}

const value = {
    addToReg,
    removeFromReg,
    isReg
}
    return <EventContext.Provider value={value}>
        {children}
    </EventContext.Provider>
}

