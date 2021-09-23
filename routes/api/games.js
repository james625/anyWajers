const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const Game = require('../../models/Game');
const Lobby = require('../../models/Lobby');
const User = require('../../models/User');

router.get('/', (req, res) => {
  Game.find()
    .sort({ date: -1 })
    .then((games) => res.json(games))
    .catch((err) => res.status(404).json({ nogamesfound: 'No games found' }));
});

router.get('/:id', async(req, res) => {
   console.log("in get single game");
    try {
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            const game = await Game.findById(req.params.id).populate({
                                                                        path: 'lobbies',
                                                                        model: 'Lobby',
                                                                        populate: {
                                                                            path: 'players',
                                                                            model: 'User'
                                                                        }
                                                                    })
            return res.json(game);
        }
    }        
    catch {
        res.status(404).json({ nogamefound: 'No game' })
    }
});



module.exports = router;
