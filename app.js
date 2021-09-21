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
const websocket = require('socket.io');
const io = websocket(server)

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello James"));

io.on("connection", socket => {
  console.log("hello World")
  socket.emit("message", "this is the curstly ckean") //to browser
  socket.on("body", text => {
    io.emit('message', text) // takes from window to server back to window
  })
})

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use("/api/users", users);
app.use("/api/games", games);
app.use("/api/lobbys", lobbys);
app.use("/api/messages", messages);
app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));

