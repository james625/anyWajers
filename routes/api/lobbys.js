const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Game = require('../../models/Game');
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
    Game.findById(req.body.game).then(game => {
        newLobby.save()
        .then(lobby =>{
                game.lobbies.push(newLobby);
                game.save()
                res.json(lobby)
            })
            .catch(err => res.json(err.respose.data));
    })
    
})

router.put("/:lobbyId", passport.authenticate('jwt', { session: false }), async(req, res) => {

    const { errors, isValid } = validateLobbyInput(req.body);
    if (!isValid) {
        return res.status(400).json({errors});
    }
    try{

        await Lobby.updateOne({_id: req.params.lobbyId}, req.body);
        
        const lobby = await Lobby.findById(req.params.lobbyId);
        res.json(lobby)
    } catch {
        res.json({error: "could not update"})
    }
})

router.put("/:lobbyId/add", async (req, res) => {
    try {

        const lobby = await Lobby.findById(req.params.lobbyId);
    
        const user = await User.findById(req.body.playerId)
    
        if(!user) return res.json({nouser: "User does not exist!"})
    
        if(lobby.players.includes(user._id)) return res.json({exists: "User is in lobby already!"})
    
        if(lobby.players.length >= lobby.playerCount) return res.json({full: "Lobby is full!"})
    
        lobby.players.push(req.body.playerId)
    
        lobby.save()
    
        res.json(lobby)
    } catch {
    }
})

router.put("/:lobbyId/remove", async(req, res) => {
    try {
        await Lobby.findOneAndUpdate(
            {"_id": req.params.lobbyId},
            {$pull: {"players": req.body.playerId}}
        )
        
        res.json({success: "Player Removed"})
    } catch {
    }
})

router.delete("/:lobbyId", passport.authenticate('jwt', { session: false }), async (req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.lobbyId)){
        try {
            const lobby = await Lobby.findById(req.params.lobbyId);
            await Game.findOneAndUpdate(
                {"_id": lobby.game},
                {$pull: { "lobbies": req.params.lobbyId}}
            )
            await Lobby.findOneAndDelete({"_id": req.params.lobbyId})
        } catch(error) {
            res.json(error);
        }
    }
})

module.exports = router;