const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Lobby = require('../../models/Lobby');
const validateLobbyInput = require('../../validation/lobbys')


router.get("/", (req, res) => {
    Lobby.find()
        .then(lobbys => res.json(lobbys))
        .catch(errs => res.status(404).json({nonefound: 'No lobbys found'}))
})


router.get('/games/lobbies')
router.get("/:lobby_id", (req, res) => {
    Lobby.findById(req.params.lobby_id)
        .then(lobby => res.json(lobby))
        .catch(err  => res.status(404).json({nolobbyfound: "No Lobby Found"}));
})


router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
      const { errors, isValid } = validateLobbyInput(req.body);
  
      if (!isValid) {
        return res.status(400).json({errors});
      }

    
    const newLobby = new Lobby({
        game: req.body.game,
        name: req.body.name,        
        owner: req.body.owner,
        description: req.body.description,
        playerCount: req.body.playerCount,
        players: [req.body.owner]
    })

    newLobby.save()
        .then(lobby => res.json(lobby))
        .catch(err => res.json(err));
})

router.delete("/:lobby_id", passport.authenticate('jwt', { session: false }), (req, res) => {
    Lobby.deleteOne({"_id": req.params.lobby_id})
    .then(lobby => res.json(lobby))
})

module.exports = router;