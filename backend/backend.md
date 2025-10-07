# Backend Documentation

### Routes to use
| Function | Route | Description | 
| ------ | --- | --- |
| BaseUrl | http://localhost:8080/ | Base Url for backend API |
| Create User | `BaseUrl`/api/users/ | Use to create a new user |
| Login | `BaseUrl`/api/auth/ | Use to login |
| Logout | `BaseUrl`/api/auth/logout | Use to logout |
| Refresh Token | `BaseUrl`/api/auth/refresh | Use to refresh access token |
| Get All Users | `BaseUrl`/api/users/ | Get All registered users |
| Get One User | `BaseUrl`/api/users/:id | Get one user by id |
| Update User |  `BaseUrl`/api/users/:id | Update one user by id |
| Delete User | `BaseUrl`/api/users/:id | Delete one user by id |
| Create Event | `BaseUrl`/api/events/ | Create new event |
| Update Event | `BaseUrl`/api/events/:id | Update event by id |
| Delete Event | `BaseUrl`/api/events/:id | Delete event by id |
| Get All Event | `BaseUrl`/api/events/ | Get all events |
| Get One Event | `BaseUrl`/api/events/:id | Get One event by id |
| Register for Event | `BaseUrl`/api/participate/register | Register student for event |
| Get All Events Registed for by User | `BaseUrl`/api/participate/registered/:id | Get all events student is registered for  |
| Get All Events Attended for by User | `BaseUrl`/api/participate/attended/:id | Get all events student has attended |
| Unregister From Event | `BaseUrl`/api/participate/unregister | Unregister student from event |
<!-- |  |  |  |
|  |  |  | -->


### Checklist
- [X] MongoDB Setup
- [X] Backend API setup
- [X] Email verification
- [X] RSS Ingestion
- [ ] Forgot Password
- [ ] Save user image to AWS S3 bucket
- [ ] Generate report of student Engagement
- [ ] Student mark attend