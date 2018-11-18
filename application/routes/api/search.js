const express = require("express");
const router = express.Router();

// Load models
const User = require("../../models/User");
const Recipe = require("../../models/Recipe");

// route   GET api/search/recipes/:input
// desc    Search recipes route
// access  Public
router.get("/recipes/:input", (req, res) => {
  console.log(req.params.input);

  Recipe.find({ $text: { $search: req.params.input } })
    .then(response => {
      res.json(response);
    })
})

// route   GET api/search/users/:input
// desc    Search users route
// access  Public
router.get("/users/:input", (req, res) => {
  console.log(req.params.input);

  User.find({ $text: { $search: req.params.input } })
    .then(response => {
      res.json(response);
    })
})

module.exports = router;