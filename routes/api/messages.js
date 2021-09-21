const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Message = require('../../models/Message');
const validateMessageInput = require('../../validation/messages');

// router.get('/lobby/:lobby_id', (req, res) => {
//     Message.find({lobby: req.params.lobby_id})
//         .then(messages => res.json(messages))
//         .catch(err => res.status(404).json({ nomessagesfound: 'No messages found' }));
// });


router.get('/lobby/:lobby_id', (req, res) => {
    Message.find({lobby: req.params.lobby_id})
        .then(messages => res.json(messages))
        .catch(err => res.status(404).json({ nomessagesfound: 'No messages found' }));
});


router.post('/lobby/:lobby_id', 
    // passport.authenticate('jwt', { session: false }), 
    (req, res) => {
    const { errors, isValid } = validateMessageInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newMessage = new Message({
        body: req.body.text,
        author: req.body.author,
        lobby: req.params.lobby_id
    });

    newMessage.save().then(message => res.json(message));
});

module.exports = router;