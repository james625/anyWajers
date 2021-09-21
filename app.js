const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const games = require("./routes/api/games");
const lobbys = require("./routes/api/lobbys");
const messages = require("./routes/api/messages");
const passport = require('passport');
const http = require("http");
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server)

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
 
app.get("/", (req, res) => res.send("Hello James"));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use("/api/users", users);
app.use("/api/games", games);
app.use("/api/lobbys", lobbys);
app.use("/api/messages", messages);
app.use(passport.initialize());
require('./config/passport')(passport);


io.on('connection', socket => {
  socket.on("body", text => {
    io.emit('receive-message', text) 
  })
})

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));

