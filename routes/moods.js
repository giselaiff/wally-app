const express = require('express');
const middleware = require('../helpers/authMiddleware');
const router = express.Router();
const User = require('../models/User');

// GET /mood

router.get('/moods', middleware.checkIfUserLoggedIn, (req, res, next) => {
	res.render('auth/moods');
});