const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LobbySchema = new Schema({
    game: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Game'
    },
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
    },
    playerCount: {
        type: Number,
        required: true
    },
    players:[{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Lobby = mongoose.model('Lobby', LobbySchema);