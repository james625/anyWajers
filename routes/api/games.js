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

router.get('/:id', (req, res) => {
    Game.findById(req.params.id)
        .then(game => res.json(game))
        .catch(err =>
            res.status(404).json({ nogamefound: 'No game' })
        );
});

// router.get('/:id', async (req, res) => {
//   try {
//     const game = await Game.findById(req.params.id);
//     game.lobbies = await Promise.all(
//       game.lobbies.map(async (lobbyId) => {
//         const lobby = await Lobby.findById(lobbyId);
//         const banana = await Promise.all(
//           lobby.players.map((id) => User.findById(id))
//         );
//         console.log(banana);
//         return lobby;
//       })
//     );
//     res.json(game);
//   } catch {
//     res.status(404).json({ nogamefound: 'No game' });
//   }
// });

module.exports = router;
