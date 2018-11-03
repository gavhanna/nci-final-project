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

// route   GET api/recipebooks/:user_id
// desc    Get user's recipe book
// access  Private
router.get("/:user_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  RecipeBook.findOne({ user_id: req.params.user_id })
    .populate({ path: "recipes", populate: { path: "user_id", select: "username" } })
    .then(recipebook => {
      console.log(recipebook);
      res.json(recipebook);
    }).catch(err => res.status(404).json({ msg: "No RecipeBook found" }))
})


// route   POST api/recipebooks/create
// desc    Create a recipe book
// access  Public
router.post("/create", (req, res) => {
  RecipeBook.findOne({ user_id: req.body.user_id })
    .then(recipebook => {
      if (!recipebook) {
        const newRecipeBook = new RecipeBook({
          user_id: req.body.user_id,
          recipes: []
        });
        newRecipeBook.save()
          .then(recipebook => res.json(recipebook))
          .catch(err => res.status(500).json({ error: "Something went wrong" }))
      } else {
        res.json({ msg: "Recipebook already exists" })
      }
    }).catch(err => res.json({ msg: "No RecipeBook found in database" }))
})

// route   POST api/recipebooks/add
// desc    Add recipe to recipebook
// access  Private
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
  console.log(req.body.recipe_id);
  RecipeBook.findOne({ user_id: req.user.id })
    .then(recipebook => {
      if (recipebook.recipes.indexOf(req.body.recipe_id) > -1) {
        res.state(500).json({ msg: "Already in Recipe Book" })
      } else {
        recipebook.recipes.push(req.body.recipe_id);
        recipebook.save()
          .then(recipebook => {
            res.json(recipebook)
          })
      }
    }).catch(err => res.status(404).json({ msg: err.message }))
})

// route   POST api/recipebooks/remove
// desc    Remove recipe from recipebook
// access  Private
router.post("/remove", passport.authenticate("jwt", { session: false }), (req, res) => {
  RecipeBook.findOne({ user_id: req.user.id })
    .then(recipebook => {
      if (recipebook.recipes.indexOf(req.body.recipe_id) > -1) {
        recipebook.recipes.pull(req.body.recipe_id);
        recipebook.save()
          .then(recipebook => {
            res.json(recipebook)
          })
      } else {
        res.state(404).json({ msg: "Recipe not found" })
      }
    }).catch(err => res.status(404).json({ msg: err.message }))
})



module.exports = router;