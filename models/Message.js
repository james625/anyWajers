const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lobby: {
        type: Schema.Types.ObjectId,
        ref: 'Lobby'
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Message = mongoose.model('Message', MessageSchema);