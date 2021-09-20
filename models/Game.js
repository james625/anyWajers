const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    lobbies: [{
        type: Schema.Types.ObjectId,
        ref: "Lobby"
      }]
  },
  {
    timestamps: true,
  }
)

module.exports = Game = mongoose.model('Game', GameSchema)
