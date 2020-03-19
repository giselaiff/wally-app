const express = require('express');

const router = express.Router();
const User = require('../models/User');


// get /profile/:id
// hacer comprobación :id === session.currentUser -> enseñar el boton
router.get('/:id', (req, res, next) => {
   // if (req.session.user._id) {
    const paramUserId = req.params.id;
    User.findOne({_id: paramUserId})
    .then (modifyProfile => {
        let isOwner;
        if(modifyProfile._id == req.session.currentUser._id){
            isOwner = true
            console.log("true")
        }else{
            isOwner = false
            console.log("false")

        }
        res.render('profile/profile' , {currentUser: modifyProfile, isOwner: isOwner})
    })  
    .catch(next);
});

// get  /profile/:id/edit -> mostrar el formulario para modificarlo

router.get('/:id/edit', (req, res, next) => {
    User.findById(req.params.id)
        .then(profileData => {
            res.render('profile/edit', { profileData });
        })
        .catch(next);
});
// post /profile/:id -> actualizar y despues redirect 

router.post('/:id', (req, res, next) => {
    const { id } = req.params;
    const {username } = req.body;
    console.log(req);
    User.update({ _id : id }, { $set: { username }})
    .then(() => {
        res.redirect(`/profile/${id}`);
    })
    .catch(next);
});

module.exports = router;