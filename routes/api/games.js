const express = require('express');
const router = express.Router();

const Game = require('../../models/Game');
const Lobby = require('../../models/Lobby');

router.get('/', (req, res) => {
    Game.find()
        .sort({ date: -1 })
        .then(games => res.json(games))
        .catch(err => res.status(404).json({ nogamesfound: 'No games found' }));
});     



// router.get('/:id', (req, res) => {
//     Game.findById(req.params.id)
//         .then(game => res.json(game))
//         .catch(err =>
//             res.status(404).json({ nogamefound: 'No game' })
//         );
// });

router.get('/:id', async(req, res) => {
   
    try {
        const game = await Game.findById(req.params.id)
        // console.log(game);
        game.lobbies = await Promise.all(game.lobbies.map(lobbyId => Lobby.findById(lobbyId)));
        res.json(game);
    }        
    catch {
        res.status(404).json({ nogamefound: 'No game' })
    }
});

module.exports = router;