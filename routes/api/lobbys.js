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
    console.log(req.body.game)
    Game.findById(req.body.game).then(game => {
        newLobby.save()
        .then(lobby =>{
                game.lobbies.push(newLobby);
                game.save()
                res.json(lobby)
            })
            .catch(err => res.json(err));
    })
    
})

router.put("/:lobbyId", passport.authenticate('jwt', { session: false }), async(req, res) => {
    console.log("inside lobby edit route");

    const { errors, isValid } = validateLobbyInput(req.body);
    if (!isValid) {
        return res.status(400).json({errors});
    }
    try{

        await Lobby.updateOne({_id: req.params.lobbyId}, req.body);
        
        const lobby = await Lobby.findById(req.params.lobbyId);
        res.json(lobby)
    } catch {
        console.log("in catch for edit route");
        res.json({error: "could not update"})
    }
})

router.put("/:lobbyId/add", async (req, res) => {
    console.log("inside lobby player route");
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
        console.log("in add player catch");
    }
})

router.put("/:lobbyId/remove", async(req, res) => {
    console.log("inside lobby remove player route");
    try {
        const lobby = await Lobby.findById(req.params.lobbyId);
        const user = await User.findById(req.body.playerId)
        if(lobby === null) return res.json({noPlayers: "no players array"})
        if(lobby.players.indexOf(user._id) === -1) return res.json({notfound: "User does not exist in lobby"})
    
        lobby.players.splice(lobby.players.indexOf(user._id), 1)
        
        lobby.update();
        res.json(lobby)
    } catch {
        console.log("in catch for remove");
    }
})

router.delete("/:lobbyId", passport.authenticate('jwt', { session: false }), async (req, res) => {
    console.log("inside delete route");
    if(mongoose.Types.ObjectId.isValid(req.params.lobbyId)){
        console.log("inside delete if statement", req.params.lobbyId);
        // const lobby = await Lobby.findById(req.params.lobbyId)
        // console.log(lobby);
        const lobby =await Lobby.findOneAndDelete({_id: req.params.lobbyId})
        console.log(lobby);
        // .then(lobby => {
        //     console.log("DELETED:", lobby);
        //     res.json(lobby)
        // }).catch(err => console.log("could not delete"))
    }
})

module.exports = router;