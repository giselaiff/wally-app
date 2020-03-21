const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

 // Get public profile for any user
  // --------------------------------------------------
  router.get('/:username', (req, res, next) => {
    const users = req.app.locals.users;
    const username = req.params.username;
  
  
  module.exports = router;