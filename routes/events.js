var express = require('express');
var router = express.Router();
const Review = require('../models/Review');
const middleware = require('../helpers/authMiddleware');
const Event = require('../models/Event');


// GET event/add: create an event  

router.get('/add', (req, res, next) => {
	res.render('events/create');
});


//POST events/:id

router.post('/add', (req, res, next) => {
	const { name, description, hour } = req.body;
	Event.create({
		name,
		description,
		hour,
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
        res.render('events/singleEvent', {eventData: singleEvent})
    })
    .catch(next);

});
/*
router.post('/:id/update', (req, res, next) => {
	const { id } = req.params;
	const { name, description, hour } = req.body;
	Event.findByIdAndUpdate(id, {
		name,
		description,
		hour,
	})
		.then(eventUpdated => {
			res.redirect('/singleEvent');
		})
		.catch(next);
});

*/



module.exports = router;






//| GET | /event/:id/update  | Update event info  |
//| POST | /event/:id  | Send updated event info  |
//| POST | /event/:id/delete  | Delete an event  |