const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router();
const Lobby = require('../../models/User');
const validateLobbyInput = require('../../validation/lobbys')


router.get("/", (req, res) => {
    Lobby.find()
        .then(lobbys => res.json(lobbys))
        .catch(errs => res.status(404).json({nonefound: 'No lobyys found'}))
})
router.get("/lobby_id", (req, res) => {
    Lobby.findById(req.params.lobby_id)
        .then(lobby => res.json(lobby))
        .catch(err  => res.status(404).json({nolobbyfoudn: "No Lobby Found"}));
})


router.post("/", (req, res) => {
    const { errors, isValid } = validateLobbyInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const newLobby = new Lobby({
        game: req.body.game,
        name: req.body.name,        
        owner: req.body.owner,
        description: req.body.description,
        playerCoun: req.body.playerCount
    })

    newLobby.save().then(lobby => res.json(tweet));

})

router.delete("/:lobby_id", (req, res) => {
    Lobby.deleteOne({"_id": ObjectId(req.params.lobby_id)})
    res.json('Deleted successfully')
})