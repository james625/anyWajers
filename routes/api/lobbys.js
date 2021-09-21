const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { reset } = require('nodemon');
const passport = require('passport');
const Lobby = require('../../models/Lobby');
const User = require('../../models/User');
const validateLobbyInput = require('../../validation/lobbys')
const Game = require('../../models/Game')


router.get("/", (req, res) => {
    Lobby.find()
        .then(lobbys => res.json(lobbys))
        .catch(errs => res.status(404).json({nonefound: 'No lobbys found'}))
})


// router.get("/", async(req, res) => {
//     try {
//         const lobbies = await Lobby.find()
//         lobbies.map(async(lobby) => {
//             const players = await Promise.all(lobby.players.map(id => User.findById(id)))
//             // console.log(lobby.players);
//             // lobby.players = players
//             // console.log(players);
//             return players
//         }); 
//         // console.log(lobbies);
//         res.json(lobbies)
//     } 
//     catch {
//         res.status(404).json({nolobbyfound: "No Lobby Found"});
//     }
// })



// router.get("/:lobby_id", (req, res) => {
//     Lobby.findById(req.params.lobby_id)
//         .then(lobby =>{
//             Promise.all(lobby.players.map(id => User.findById(id)))
//             .then(players => res.json({players, lobby}))
//             // res.json(lobby)
//         })
//         .catch(err  => res.status(404).json({nolobbyfound: "No Lobby Found"}));
// })

router.get("/:lobby_id", async(req, res) => {

    try { 
        const lobby = await Lobby.findById(req.params.lobby_id)
        const players = await Promise.all(lobby.players.map(id => User.findById(id)))
        res.json({lobby, players})
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