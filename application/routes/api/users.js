const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register")
const validateLoginInput = require("../../validation/login")

// Load user model
const User = require("../../models/User");

// route   GET api/users/test
// desc    Test users route
// access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "working" })
})

// route   POST api/users/register
// desc    Register a user
// access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Vaidation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ username: req.body.username })
    .then(user => {
      if (user.username === req.body.username) {
        errors.username = "Username already exists"
        return res.status(400).json(errors);
      }
    }).catch(err => console.log(err))

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          blurb: req.body.blurb,
          username: req.body.username
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    }).catch(err => {
      errors.username = "Username already taken";
      res.status(500).json(errors);
    });
});

// route   POST api/users/login
// desc    Log user in
// access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Vaidation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email })
    .populate({ path: "followers", select: "username" })
    .populate({ path: "following", select: "username" })
    .then(user => {
      console.log(user);
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors)
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // User Matched
            // JWT payload
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              username: user.username,
              followers: user.followers,
              following: user.following
            }

            // Sign Token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 604800000 }, // expires in one week
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                })
              })
          } else {
            errors.password = "Password incorrect"
            return res.status(400).json(errors);
          }
        })
    })
});

// route    GET api/users/follow
// desc     Follow/unfollow a user for current user
// acccess  Private
router.post("/follow", passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {};
  User.findOne({ email: req.user.email })
    .then(user => {
      // check if user is already following this id
      if (user.following.indexOf(req.body.user_id) > -1) {
        // if user is already following the target user
        // remove target user from "following" array
        user.following.pull(req.body.user_id);
        user.save()
          .then(user => {
            // find the person you just unfollowed
            User.findById(req.body.user_id)
              .then(userToFollow => {
                // remove your id from their array
                userToFollow.followers.pull(req.user.id);
                userToFollow.save()
                  // return logged in users info
                  .then(userToFollow => res.json(user));
              })
              .catch(err => res.status(400).json(err))
          })
          .catch(err => res.status(400).json(err));
      } else {
        // add the person you are now following's id to your "following" array
        user.following.push(req.body.user_id);
        user.save()
          .then(user => {
            // find the person you just followed
            User.findById(req.body.user_id)
              .then(userToFollow => {
                // update their "followers" array with your id
                userToFollow.followers.push(req.user.id);
                userToFollow.save()
                  // return logged in users info
                  .then(userToFollow => res.json(user));
              })
              .catch(err => res.status(400).json(err))
          })
          .catch(err => res.status(400).json(err))
      }
    })
});

// route    GET api/users/username/:username
// desc     Get user info by username
// access   Public
router.get("/username/:username", (req, res) => {
  User.findOne({ username: req.params.username })
    .populate({ path: "followers", select: "username" })
    .populate({ path: "following", select: "username" })
    .then(user => {
      const userData = {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
      }
      res.json(userData)
    }).catch(err => res.status(400).json(err));
})


// route    GET api/users/current 
// desc     Return current user
// acccess  Private
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  // res.json({
  //   id: req.user.id,
  //   name: req.user.name,
  //   email: req.user.email,
  //   username: req.user.username,
  //   favourites: req.user.favourites
  // })
  User.findOne({ username: req.user.username })
    .then(user => {
      const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        follower: user.followers,
        following: user.following
      }
      res.json(userData);
    }).catch(err => res.status(400).json(err));
});


module.exports = router;