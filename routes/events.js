var express = require('express');
var router = express.Router();
const Review = require('../models/Review');
const middleware = require('../helpers/authMiddleware');
const Event = require('../models/Event');
const User = require('../models/User');


// GET event/add: create an event  

router.get('/add', (req, res, next) => {
	res.render('events/create');
});


//POST events/:id

router.post('/add', (req, res, next) => {
    const { name, description, hour, location } = req.body;
    const userId = req.session.currentUser._id
    Event.create({
        userId,
		name,
		description,
        hour,
        location,
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
        .then (singleEvent => {
            let isOwner;
            if(singleEvent.userId == req.session.currentUser._id){
                isOwner = true
            }else{
                isOwner = false
            }
            res.render('events/singleEvent', {eventData: singleEvent, isOwner: isOwner})
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

    const {name, description, hour, location} = req.body;
    
    Event.update({ _id : id }, { $set: { name, description, hour, location }})
    .then(() => {
        res.redirect(`/events/${id}`);
    })
    .catch(next);

});




module.exports = router;







//| POST | /event/:id/delete  | Delete an event  |