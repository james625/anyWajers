const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Lobby = require('../../models/Lobby');
const User = require('../../models/User');
const validateLobbyInput = require('../../validation/lobbys')


router.get("/", (req, res) => {
    console.log("inside get / route");

    Lobby.find().populate({
                            path: 'players',
                            model: 'User' 
    })
        .then(lobbys => res.json(lobbys))
        .catch(errs => res.status(404).json({nonefound: 'No lobbys found'}))
})

router.get("/:lobby_id", async(req, res) => {
    console.log("inside single lobby route");

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
    console.log("inside lobby post route");

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
    
    newLobby.save()
    .then(lobby =>{
            game.lobbies.push(newLobby);
            game.save()
            res.json(lobby)
        })
        .catch(err => res.json(err));
})

router.put("/:lobbyId", passport.authenticate('jwt', { session: false }), async(req, res) => {
    console.log("inside lobby edit route");

    const { errors, isValid } = validateLobbyInput(req.body);
    if (!isValid) {
        return res.status(400).json({errors});
    }
    
    await Lobby.updateOne({_id: req.params.lobbyId}, req.body);
    
    const lobby = await Lobby.findById(req.params.lobbyId);
    res.json(lobby)
})

router.put("/:lobbyId/add", async (req, res) => {
    console.log("inside lobby player route");

    const lobby = await Lobby.findById(req.params.lobbyId);

    const user = await User.findById(req.body.playerId)

    if(!user) return res.json({nouser: "User does not exist!"})

    if(lobby.players.includes(user._id)) return res.json({exists: "User is in lobby already!"})

    if(lobby.players.length >= lobby.playerCount) return res.json({full: "Lobby is full!"})

    lobby.players.push(req.body.playerId)

    lobby.save()

    res.json(lobby)
})

router.put("/:lobbyId/remove", async(req, res) => {
    console.log("inside lobby remove player route");

    const lobby = await Lobby.findById(req.params.lobbyId);
    const user = await User.findById(req.body.playerId)

    const index = lobby.players.indexOf(user._id)
    if(index === -1) return res.json({notfound: "User does not exist in lobby"})

    lobby.players.splice(index, 1)
    
    lobby.save();
    res.json(lobby)
})

router.delete("/:lobbyId", passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("inside delete route");
    if(mongoose.Types.ObjectId.isValid(req.params.lobbyId)){
        console.log("inside if statement");
        Lobby.deleteOne({"_id": req.params.lobbyId})
        .then(lobby => {
            res.json(lobby)
        })
    }
})

module.exports = router;