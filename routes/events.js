/* eslint-disable no-underscore-dangle */
const express = require('express');
const Event = require('../models/Event');
const Review = require('../models/Review');
const middleware = require('../helpers/authMiddleware');

const router = express.Router();

router.use(middleware.checkIfUserLoggedIn);

/* GET /events */
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

// GET /events/add
router.get('/add', (req, res) => {
	res.render('events/create');
});

// POST /events
router.post('/', (req, res, next) => {
	const { name, description, hour } = req.body;
	Event.create({
		name,
		description: parseFloat(description),
		hour: parseFloat(hour),
	})
		.then(() => {
			res.redirect('/events');
		})
		.catch(next);
});

// POST /events/:id/delete
router.post('/:id/delete', (req, res, next) => {
	const { id } = req.params;

	Event.findByIdAndDelete(id)
		.then(() => {
			res.redirect('/events');
		})
		.catch(next);
});

// GET /events/:params/update?query=valor
router.get('/:id/update', (req, res, next) => {
	const { id } = req.params;

	Review.find({ event_id: id })
		.populate('event_id')
		.then(reviews => {
			const { event_id: event } = reviews[0];
			res.render('events/update', { event, reviews });
		})
		.catch(next);
});

// POST /events/:id
router.post('/:id', (req, res, next) => {
	const { id } = req.params;
	const { name, description, hour } = req.body;
	Event.findByIdAndUpdate(id, {
		name,
		description,
		hour,
	})
		.then(eventUpdated => {
			res.redirect('/events');
		})
		.catch(next);
});

// POST /events/:id/review
router.post('/:id/review', (req, res, next) => {
	const { id } = req.params;
	const { author, text } = req.body;
	Review.create({
		event_id: id,
		author,
		text,
	})
		.then(() => {
			res.redirect(`/events/${id}/update`);
		})
		.catch(next);
});

module.exports = router;
