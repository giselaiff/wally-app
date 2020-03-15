# Wally, find me.
​
## Description​

Wally is a collaborative application that allows you to meet people with similar interests to yours. The user can create an event or simply attend one created by another user; In this way, Wally allows creating bridges to establish new social relationships.

## User Stories
​
**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
​

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

​
**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup

​
**Sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend

​
**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account

**Moods** - As a user I want to select my mood

​
**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
​

**Events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
​

**Events create** - As a user I want to create an event so that I can invite others to attend
​

**Events detail** - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend
​

**Attend event** - As a user I want to be able to attend to event so that the organizers can count me in


**User profile​** - As a user I want to see my profile page and modify my user information.


**Profile of another user** - As a user I want to see the profile of another users.

## Backlog
​
List of other features outside of the MVPs scope
​

**User profile** - upload my profile picture - list of events created by the user - list events the user is attending

​
**Geo Location** - add geolocation to events when creating - show event in a map in event detail page - show all events in a map in the event list page

​
**Community Chat** - add a chat when the event is closed because it is complete  

​
## ROUTES:
​
| Method  | Endpoint  | Description  |
|---------|-----------|--------------|
| GET  | /  |  HomePage |
| GET  | /login  | Login page  |
| POST | /login  | Send user info and logged in  |
| GET | /signup  | Sign up page |
| POST | /singup  | Send user info and sign up  |
| GET | /mood  | Mood page  |
| POST | /mood  | Send mood user info and redirect to event page  |
| GET | /event  | See all events  |
| POST | /event/:id  | See one event  |
| GET | /event/add  | Create an event  |
| GET | /event/:id/update  | Update event info  |
| POST | /event/:id  | Send updated event info  |
| POST | /event/:id/delete  | Delete an event  |
| GET | /profile/:id  | See another user profile  |






​
## Models
​
```javascript
User model
​
    {
    	username: {
            type: String,
            required: true,
            unique: true,
        },
        
        password: {
            type: String,
            required: true,
        }
    }
 
Event model
​
    { 
    	owner: ObjectId<User>,
    	name: {
            type: String,
            required: true,
        },
        /*photo: {
            type: Image,
        },*/,
    	description: {
            type: String,
            required: true,
        },
        time: {
            type: Number,
            required: true,
        },
    	date: {
            type: Date,
            required: true,
        },

    	location: {
            type: String,
            required: true,
        },
    
    }
​
## Links
​
### Trello
​
https://trello.com/b/ybfw23uX/wally
​
### Git
​
The url to your repository and to your deployed project
​
[Repository Link](http://github.com/)
​
[Deploy Link](http://heroku.com/)
​
### Slides
​
[Slides Link](http://slides.com/)