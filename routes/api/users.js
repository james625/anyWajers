const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateUserInput = require('../../validation/users');
const { route } = require("./lobbys");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({email: "Email is already taken"});
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = { id: user.id, username: user.username };

              jwt.sign(payload, keys.secretOrKey, (err, token) => { // here
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
            })
            .catch(err => res.json(err));
        });
      }); 
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "This user does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, email: user.email, username: user.username, bio: user.bio, favGame: user.favGame };

        jwt.sign(payload, keys.secretOrKey, (err, token) => { //here
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
})

// newly added 

router.get('/find', (req, res) => {
  User.findById(req.body.userId).then((user) => {
    res.json(user)
  }).catch(() => {
    res.status(404).json("couldn't find user")
  })
}) 

router.put("/:userId", passport.authenticate('jwt', { session: false }), async(req, res) => {

    const { errors, isValid } = validateUserInput(req.body);
    if (!isValid) {
        return res.status(400).json({errors});
    }
    const user = await User.findOneAndUpdate({_id: req.params.userId}, req.body)
    const newUser = await User.findById(req.params.userId);
    newUser.save()
    res.json(newUser)
})

router.get('/:userId', (req,res) => {
  User.findById(req.params.userId).then(user => res.json(user))
})

router.delete("/:userId", passport.authenticate('jwt', { session: false }), (req, res) => {
    User.deleteOne({"_id": req.params.userId})
    .then(user => {
        res.json(user)
    })
})

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

module.exports = router;