const express = require('express');
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
   
    try {
        const game = await Game.findById(req.params.id).populate({
                                                                    path: 'lobbies',
                                                                    model: 'Lobby',
                                                                    populate: {
                                                                        path: 'players',
                                                                        model: 'User'
                                                                    }
                                                                })
        // console.log(game);
        res.json(game);
    }        
    catch {
        res.status(404).json({ nogamefound: 'No game' })
    }
});



module.exports = router;
