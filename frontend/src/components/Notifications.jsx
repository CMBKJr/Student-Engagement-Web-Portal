function Notifications({notification}) {

    return (
         <>
        <div className="notification-row">
        {/* <div className="notification-row" style={{borderRadius:'10px', width:'219px', border: '1px solid lightgray', marginLeft:'1080px'}}> */}
            <p>&#8226;&nbsp;{notification.message}</p>
        </div>
    <br>
    </br>
    </>
    )
}
export default Notifications;