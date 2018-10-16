const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load input validation
const validateRecipeInput = require("../../validation/recipe")

// Load user model
const User = require("../../models/User");
const Recipe = require("../../models/Recipe");

// route   GET api/recipes/test
// desc    Test recipes route
// access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "working" })
})

// route   POST api/recipes/new
// desc    Create new recipe
// access  Private
router.post("/new", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateRecipeInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const newRecipe = new Recipe({
    user_id: req.user.id,
    title: req.body.title,
    desc: req.body.desc,
    dietary: req.body.dietary,
    meal: req.body.meal,
    img_url: req.body.img_url,
    cooktime: parseInt(req.body.cooktime),
    preptime: parseInt(req.body.preptime)
  })
  newRecipe.ingredients.push(req.body.ingredients);
  newRecipe.method.push(req.body.method);

  newRecipe.save()
    .then(recipe => {
      res.json(recipe);
    }).catch(err => res.json(err));
});

// route   POST api/recipes/like
// desc    Like a recipe
// access  Private
router.post("/like", passport.authenticate("jwt", { session: false }), (req, res) => {
  Recipe.findById(req.body.recipe_id)
    .then(recipe => {
      if (recipe.likes.indexOf(req.user.id) > -1) {
        recipe.likes.pull(req.user.id);
      } else {
        recipe.likes.push(req.user.id);
      }
      recipe.save()
        .then(recipe => {
          res.json(recipe)
        })
        .catch(err => res.status(400).json(err))
    })
});




module.exports = router;