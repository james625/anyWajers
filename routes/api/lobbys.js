const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Lobby = require('../../models/Lobby');
const User = require('../../models/User');
const validateLobbyInput = require('../../validation/lobbys')


router.get("/", (req, res) => {
    Lobby.find().populate({
                            path: 'players',
                            model: 'User' 
    })
        .then(lobbys => res.json(lobbys))
        .catch(errs => res.status(404).json({nonefound: 'No lobbys found'}))
})

router.get("/:lobby_id", async(req, res) => {

    try { 
        const lobby = await Lobby.findById(req.params.lobby_id).populate({
                                                                    path: 'players',
                                                                    model: 'User'
                                                                })
        res.json(lobby)
    }
    catch {
        res.status(404).json({nolobbyfound: "No Lobby Found"})
    }

})


router.post("/", passport.authenticate('jwt', { session: false }), async(req, res) => {
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

    const game = await Game.findById(req.body.game);
    console.log(game.lobbies);
    
    newLobby.save()
    .then(lobby =>{
            game.lobbies.push(newLobby);
            game.save()
            res.json(lobby)
        })
        .catch(err => res.json(err));
})

router.put("/:lobbyId", async(req, res) => {
    const lobby = await Lobby.findById(req.params.lobbyId);
    if(lobby.players.length >= lobby.playerCount) res.json({full: "Lobby is full!"})
    lobby.players.push(req.body.playerId)
    lobby.save()
    res.json(lobby)
})

router.delete("/:lobby_id", passport.authenticate('jwt', { session: false }), (req, res) => {
    Lobby.deleteOne({"_id": req.params.lobby_id})
    .then(lobby => res.json(lobby))
})

module.exports = router;