const express = require('express');
const middleware = require('../helpers/authMiddleware');

const router = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');


// GET /profile/:id
router.get('/:id', middleware.checkIfUserLoggedIn, (req, res, next) => {
    const paramUserId = req.params.id;
    User.findOne({_id: paramUserId})
    .then (modifyProfile => {
        let isOwner;
        if(modifyProfile._id == req.session.currentUser._id){
            isOwner = true
        }else{
            isOwner = false
        }

        Event.find( {joined: modifyProfile._id} )
        .then(myEvents => {
            console.log(myEvents)
            res.render('profile/profile' , {currentUser: modifyProfile, isOwner: isOwner, myEvents})
        })
    })  
    .catch(next);
});

// get  /profile/:id/edit -> mostrar el formulario para modificarlo

router.get('/:id/edit', middleware.checkIfUserLoggedIn, (req, res, next) => {
    User.findById(req.params.id)
        .then(profileData => {
            res.render('profile/edit', { profileData });
        })
        .catch(next);
});
// post /profile/:id -> actualizar y despues redirect 

router.post('/:id', (req, res, next) => {
    const { id } = req.params;
    const {username, age, description, city, mood } = req.body;
    console.log(req);
    User.findByIdAndUpdate(id,{ $set: { username, age, description, city, mood  }},{new: true} )
    .then((user) => {
        req.session.currentUser = {
            mood: user.mood,
            username: user.username,
            _id: user._id,
        }
        res.redirect(`/profile/${id}`);        
    })
    .catch(next);
});

// POST /profile/:id/delete
router.post('/:id/delete', (req, res, next) => {
	const { id } = req.params;
	User.findByIdAndDelete(id)
		.then(() => {
            res.redirect ('/')
		})
        .catch(next); 
});

 module.exports = router;