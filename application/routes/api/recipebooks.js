const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load input validation
const validateRecipeInput = require("../../validation/recipe")

// Load user model
const User = require("../../models/User");
const Recipe = require("../../models/Recipe");
const RecipeBook = require("../../models/RecipeBook");

// route   GET api/recipebooks/test
// desc    Test recipebooks route
// access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "working" })
})

// route   GET api/recipebooks
// desc    Get all recipe books
// access  Private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  RecipeBook.findOne({ user_id: req.user.id })
    .populate("recipes")
    .then(recipebook => {
      res.json(recipebook);
    }).catch(err => res.status(404).json({ msg: "No RecipeBook found" }))
})


// route   POST api/recipebooks/create
// desc    Create a recipe book
// access  Private
router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
  RecipeBook.findOne({ user_id: req.user.id })
    .then(recipebook => {
      if (!recipebook) {
        const newRecipeBook = new RecipeBook({
          user_id: req.user.id,
          recipes: []
        });
        newRecipeBook.save()
          .then(recipebook => res.json(recipebook))
          .catch(err => res.status(500).json({ error: "Something went wrong" }))
      } else {
        res.status(404).json({ msg: "No RecipeBook found" })
      }
    }).catch(err => res.status(404).json({ msg: "No RecipeBook found" }))
})

// route   POST api/recipebooks/add_remove
// desc    Add or recipe to/from recipebook
// access  Private
router.post("/add_remove", passport.authenticate("jwt", { session: false }), (req, res) => {
  RecipeBook.findOne({ user_id: req.user.id })
    .then(recipebook => {
      if (recipebook.recipes.indexOf(req.body.recipe_id) > -1) {
        recipebook.recipes.pull(req.body.recipe_id);
      } else {
        recipebook.recipes.push(req.body.recipe_id);
      }
      recipebook.save()
        .then(recipebook => {
          res.json(recipebook)
        })
    }).catch(err => res.status(404).json({ msg: err.message }))
})



module.exports = router;