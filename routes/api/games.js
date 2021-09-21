const express = require('express');
const router = express.Router();

const Game = require('../../models/Game');
const Lobby = require('../../models/Lobby');

// router.get('/', (req, res) => {
//     Game.find()
//         .sort({ date: -1 })
//         .then(games => res.json(games))
//         .catch(err => res.status(404).json({ nogamesfound: 'No games found' }));
// });     

router.get('/', async(req, res) => {
    
    try {
        const games = await Game.find();
        console.log(games);
        const lobbies = await Promise.all(games.lobbies.map(lobbyId => Lobby.findById(lobbyId)));
        console.log(1);
        res.json({games, lobbies});
    }        
    catch {
        res.status(404).json({ nogamesfound: 'No games found' })
    }
});


router.get('/:id', (req, res) => {
    Game.findById(req.params.id)
        .then(game => res.json(game))
        .catch(err =>
            res.status(404).json({ nogamefound: 'No game' })
        );
});


module.exports = router;