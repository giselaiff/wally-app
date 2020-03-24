var express = require('express');
var router = express.Router();
const middleware = require('../helpers/authMiddleware');
const Event = require('../models/Event');
const User = require('../models/User');



// GET event/add: create an event  

router.get('/add', middleware.checkIfUserLoggedIn, (req, res, next) => {
	res.render('events/create');
});


//POST events/:id

router.post('/add', (req, res, next) => {
    const { name, description, hour, location, mood } = req.body;
    const userId = req.session.currentUser._id
    Event.create({
        userId,
		name,
		description,
        hour,
        location,
        mood,
	})
		.then(() => {
			res.redirect('/events');
		})
		.catch(next);
});


//GET all events: /events

router.get('/', (req, res, next) => {
	const { currentUser } = req.session;
	Event.find()
		.then(events => {
			res.render('events/list', {
				events,
				currentUser,
				info: req.flash('info'),
			});
		})
		.catch(next);
});

// POST see one event:  /event/:id

router.get('/:id', (req, res, next) => {

    const paramEventId = req.params.id;

    Event.findOne({_id: paramEventId})
        .populate("joined")
        .then (singleEvent => {
            const isOwner = singleEvent.userId == req.session.currentUser._id;
            let isJoined;
            singleEvent.joined.forEach((user) => {
                if (user._id == req.session.currentUser._id){
                    isJoined = true;
                }
                else {
                    isJoined = false;
                }
            })
            res.render('events/singleEvent', {eventData: singleEvent, isOwner, isJoined})
        })
        .catch(next);
});

//GET Update event info:  /event/:id/update

router.get('/:id/update', (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => {
            res.render('events/update', { event });
        })
        .catch(next);

});

//| POST | /event/:id  | Send updated event info  |

router.post('/:id', (req, res, next) => {
    const { id } = req.params;

    const {name, description, hour, location, mood} = req.body;
    
    Event.update({ _id : id }, { $set: { name, description, hour, location, mood }})
    .then(() => {
        res.redirect(`/events/${id}`);
    })
    .catch(next);

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
