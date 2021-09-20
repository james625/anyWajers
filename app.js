const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const games = require("./routes/api/games");
const messages = require("./routes/api/messages")
const passport = require('passport');


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello James"));

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use("/api/users", users);
app.use("/api/games", games);
app.use("/api/messages", messages);
app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

