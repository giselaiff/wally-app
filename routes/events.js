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
module.exports = router;




//| POST | /event/:id  | See one event  |
//| GET | /event/add  | Create an event  |
//| GET | /event/:id/update  | Update event info  |
//| POST | /event/:id  | Send updated event info  |
//| POST | /event/:id/delete  | Delete an event  |