const express = require('express');
const bcrypt = require('bcrypt');
const middleware = require('../helpers/authMiddleware');
const User = require('../models/User');
const Event = require('../models/Event');

const router = express.Router();
const saltRounds = 10;

router.get('/', (req, res, next) => {
	res.render('index', { title: 'M o o d' });
});

router.get('/signup', (req, res, next) => {
	res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
	const { username, password } = req.body;
	if (username === '' || password === '') {
		res.render('auth/signup', { error: 'Upss! The fields are empty' });
	} else {
		User.findOne({ username })
			.then(user => {
				if (user) {
					res.render('auth/signup', { error: 'Hey! You are already registered!' });
				} else {
					const salt = bcrypt.genSaltSync(saltRounds);
					const hashedPassword = bcrypt.hashSync(password, salt);
					User.create({
						username,
						hashedPassword,
					})
						.then(userCreated => {
							req.session.currentUser = userCreated;
							res.redirect('/mood');
						})
						.catch(error => {
							console.log('error', error);
							next(error);
						});
				}
			})
			.catch(error => {
				next(error);
			});
	}
});

router.get('/login', (req, res, next) => {
	res.render('auth/login', { error: req.flash('error') });
});

router.post('/login', (req, res, next) => {
	const { username, password } = req.body;
	if (username === '' || password === '') {
		req.flash('error', 'Upss! The fields are empty');
		res.redirect('/login');
	} else {
		User.findOne({ username })
			.then(user => {
				if (!user) {
					req.flash('error', 'You are not registered... join us!');
					res.redirect('/login');
				} else {
					//ACORDARME DE AÑADIR AQUÍ PROPIEDADES OBJETO USER
					console.log(bcrypt.compareSync(password, user.hashedPassword));
					if (bcrypt.compareSync(password, user.hashedPassword)) {
						req.session.currentUser = {
							mood: user.mood,
							username : user.username,
							_id : user._id,
						};
						res.redirect('/mood');
					} else {
						req.flash('error', 'Username or password are incorrect');
						res.redirect('/login');
					}
				}
			})
			.catch(error => {
				next(error);
			});
	}
});

//MOODS
//GET /mood

router.get('/mood', middleware.checkIfUserLoggedIn, (req, res, next) => {
    res.render('mood');
});

//POST 


router.post('/mood', (req, res, next) => {
	//comparar el mood escogido con el mood del evento
	//necesito: mood evento y mood usuario
	let mood= req.body.mood;
	
	User.findByIdAndUpdate(req.session.currentUser._id, {mood}, {new: true})
	.then(user => {
		req.session.currentUser = {
			mood: user.mood,
			username : user.username,
			_id : user._id,
		};
	
		req.flash('info', 'Welcome ');
		res.redirect('/events'); 
	})
	.catch(error => {
		next(error);
	});

});

router.get('/logout', middleware.checkIfUserLoggedIn, (req, res, next) => {
	req.session.destroy(err => {
		if (err) {
			next(err);
		}
		res.redirect('/');
	});
});

module.exports = router;
