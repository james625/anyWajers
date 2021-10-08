# any Wajers?

Have you ever found yourself wanting to play a team game with no one to play with? That's where any Wajers? comes in.
Select your game. Create a lobby. Build your team.

## Live Link - [any Wajers?](https://anywajers.herokuapp.com/#/)

## Overview

any Wajers? is a website where gamers can go to create and join teams to play games. Users will be able to create their own teams for a specific game via lobbies and will be able to chat with their teammates. Users can also view past ratings and reviews for their teammates and will be able to leave ratings and review of their own.

## Technologies & Languages
+ MongoDB
+ Mongoose
+ Express
+ Node.js
+ Socket.IO
+ JavaScript
+ React/Redux

## Features 

### Live Chat

Logged in users that are in a lobby can live chat with the other members in that lobby.

### Lobby CRUD

Logged in users can create, edit and delete their own lobbies. If a user leaves a lobby that they created, the lobby will automatically be deleted.

### User Profile

Users can login and create an account, logged in users can view their profile page. On the user profile page, a user can view and edit their information or delete their account.

### Game Lobbies

In a game's show page, users can view a list of all of the open lobbies for a game. On each game show page, logged in users have the ability to create a new lobby for that game or join an existing lobby. 

## Code

In order to clear up database space, we were able to delete all of the messages that were tied to a particular lobby when the lobby was deleted. This was achieved using the db.collection.deleteMany() method.

```js
router.delete("/:lobbyId", passport.authenticate('jwt', { session: false }), async (req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.lobbyId)){
        try {
            const lobby = await Lobby.findById(req.params.lobbyId);
            await Game.findOneAndUpdate(
                {"_id": lobby.game},
                {$pull: { "lobbies": req.params.lobbyId}}
            )
            await Message.deleteMany(
                {"lobby": req.params.lobbyId}
            )
            await Lobby.findOneAndDelete({"_id": req.params.lobbyId})
        } catch(error) {
            res.json(error);
        }
    }
})
```

