var express = require('express');
var router = express.Router();
const moment = require('moment');
const middleware = require('../helpers/authMiddleware');
const Event = require('../models/Event');
const User = require('../models/User');



// GET event/add: create an event  

router.get('/add', middleware.checkIfUserLoggedIn, (req, res, next) => {
	res.render('events/create');
});


//POST events/:id

router.post('/add', (req, res, next) => {
    const { name, description, hour, date, location, mood } = req.body;
    const userId = req.session.currentUser._id;
    if (name === '' || description === '' || hour === '' || date === '' || location === '' || mood === '') {
        res.render('events/create', { error: 'Upss! The fields are empty' });
	} else {
    Event.create({
        userId,
		name,
		description,
        hour,
        location,
        date,
        mood,
	})
		.then(() => {
			res.redirect('/events');
		})
        .catch(next);
    }
})

//GET all events: /events

router.get('/', middleware.checkIfUserLoggedIn, (req, res, next) => {
    const { currentUser } = req.session;
    const { mood } = currentUser;
    let moodToFind;
    console.log(req.session)
    if (mood ==='Chill' || mood === 'Medium' || mood === 'Hard') {
        moodToFind = mood;
	    Event.find( { mood: moodToFind } )
		    .then(events => {
			    res.render('events/list', {
			    	events,
                    currentUser,
                    mood,
			    	info: req.flash('info'),
			    });
            })
            .catch(next);
    } 
    else {
        Event.find({})
            .then(events => {
                res.render('events/list', {
                    events,
                    currentUser,
                    info: req.flash('info'),
                })
            })
       
    }
});

// GET see one event:  /event/:id

router.get('/:id', middleware.checkIfUserLoggedIn, (req, res, next) => {

    const paramEventId = req.params.id;


    Event.findOne({_id: paramEventId})
        .populate("joined")
        .then (singleEvent => {
            const isOwner = singleEvent.userId == req.session.currentUser._id;
            let isJoined;
            const momentDate = moment(singleEvent.date).format("Do MMM YYYY")
            singleEvent.joined.forEach((user) => {
                if (user._id == req.session.currentUser._id){
                    isJoined = true;
                }
                else {
                    isJoined = false;
                }
            })
           
            res.render('events/singleEvent', {eventData: singleEvent, momentDate, isOwner, isJoined})
        })
        .catch(next);
});

//GET Update event info:  /event/:id/update

router.get('/:id/update', middleware.checkIfUserLoggedIn, (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => {
            res.render('events/update', { event });
        })
        .catch(next);

});

//| POST | /event/:id  | Send updated event info  |

router.post('/:id', (req, res, next) => {
    const { id } = req.params;

    const {name, description, hour, location, date, mood} = req.body;
    if (name === '' || description === '' || hour === '' || date === '' || location === '' || mood === '') {
        res.render('events/update', { error: 'Upss! The fields are empty' });
	} else {
    Event.update({ _id : id }, { $set: { name, description, hour, date, location, mood }})
    .then(() => {
        res.redirect(`/events/${id}`);
    })
    .catch(next);
    }
});


//| POST | /event/:id/delete  | Delete an event  |
router.post('/:id/delete', (req, res, next) => {
	const { id } = req.params;

	Event.findByIdAndDelete(id)
		.then(() => {
			res.redirect('/events');
		})
		.catch(next);
});

//POST |, /event/join | Join an event  |
 router.post('/:id/:join', (req, res, next) => {
    const { id, join } = req.params;
    const myUserId = req.session.currentUser._id;
    let updateAction;
    if( join === "join"){
        updateAction = "$push"
    } 
    else {
        updateAction = "$pull"
    }
    Event.update({
        "_id": id }, 
       {
           [updateAction]: {
               "joined": myUserId
            }
       }
   )
    .then(() => {
        res.redirect(`/events/${id}`);
    })
    .catch(next);

});

module.exports = router;
