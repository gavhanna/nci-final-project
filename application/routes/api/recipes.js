const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load input validation
const validateRecipeInput = require("../../validation/recipe")
const validateCommentInput = require("../../validation/comment")

// Load models
const User = require("../../models/User");
const Recipe = require("../../models/Recipe");

// route   GET api/recipes/test
// desc    Test recipes route
// access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "working" })
})

// route   POST api/recipes/create
// desc    Create new recipe
// access  Private
router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {

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
    serves: req.body.serves,
    meal: req.body.meal,
    img_url: req.body.img_url,
    cooktime: req.body.cooktime,
    preptime: req.body.preptime,
    ingredients: req.body.ingredients,
    method: req.body.method,
  })
  newRecipe.save()
    .then(recipe => {
      res.json(recipe);
    }).catch(err => res.json(err));
});

// route   PUT api/recipes/edit
// desc    Edit existing recipe
// access  Private
router.post("/edit", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateRecipeInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Recipe.findById(req.body.id)
    .then(recipe => {
      recipe.title = req.body.title;
      recipe.desc = req.body.desc;
      recipe.dietary = req.body.dietary;
      recipe.serves = req.body.serves;
      recipe.meal = req.body.meal;
      recipe.img_url = req.body.img_url;
      recipe.cooktime = req.body.cooktime;
      recipe.preptime = req.body.preptime;
      recipe.ingredients = req.body.ingredients;
      recipe.method = req.body.method;

      recipe.save()
        .then(recipe => {
          res.json(recipe);
        }).catch(err => res.json(err));
    })
    .catch(err => res.status(404).json({ msg: err }))
});

// route   DELETE api/recipes/delete
// desc    Delete a recipe by id
// access  Private
router.delete("/delete/:recipe_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Recipe.deleteOne({ _id: req.params.recipe_id })
    .then(data => res.json({ msg: "Recipe successfully deleted" }))
    .catch(err => res.json(err))
});

// route   POST api/recipes/like
// desc    Like/unlike a recipe
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

// route   GET api/recipes/:user_id
// desc    Get specific user recipes, sorted by most recent
// access  Public
router.get("/:user_id", (req, res) => {
  Recipe.find({ user_id: req.params.user_id })
    .sort([["created_at", -1]])
    .populate({ path: "likes", select: "username" })
    //.populate("comments")
    .then(recipes => {
      res.json(recipes);
    })
    .catch(err => res.status(404).json({ msg: "No recipes found" }))
});

// route   GET api/recipes/user/:username
// desc    Get specific user recipes, sorted by most recent
// access  Public
router.get("/user/:username", (req, res) => {
  const { username } = req.params;
  Recipe.find()
    .sort([["created_at", -1]])
    .populate({ path: "user_id", select: "username" })
    .then(recipes => {
      const userRecipes = recipes.filter(recipe => {
        return recipe.user_id.username === username
      })
      res.json(userRecipes);
    }).catch(err => res.status(404).json({ msg: "No recipes found" }))

});

// route   GET api/recipes/:recipe_id
// desc    Get specific recipe
// access  Public
router.get("/recipe/:recipe_id", (req, res) => {
  Recipe.find({ _id: req.params.recipe_id })
    //.populate({ path: "likes", select: "username" })
    .populate({ path: "comments.user", select: "username img_url" })
    //.populate("comments")
    .then(recipe => {
      res.json(recipe);
    })
    .catch(err => res.status(404).json({ msg: "No recipes found" }))
});


// route   GET api/recipes/
// desc    Get 50 most recent recipes from all users
// access  Public
router.get("/", (req, res) => {
  Recipe.find()
    .limit(50)
    .sort([["created_at", -1]])
    .populate({ path: "user_id", select: "username img_url" })
    .populate({ path: "likes", select: "username" })
    //.populate({ path: "comments", select: "username" })
    .then(recipes => {
      res.json(recipes);
    })
    .catch(err => res.status(404).json({ msg: err.message }))
});

// Comments based routes

// route   POST api/recipes/comments/create
// desc    Create a new comment
// access  Private
router.post("/comments/create", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);
  console.log(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const newComment = {
    user: req.user.id,
    text: req.body.text
  }
  if (req.body.edited_at) {
    newComment.edited_at = req.body.edited_at;
  }

  Recipe.findById(req.body.recipe_id)
    .then(recipe => {

      recipe.comments.push(newComment);

      recipe.save()
        .then(recipe => {
          res.json(recipe)
        })
        .catch(err => res.status(400).json(err))
    })
});


// route   DELETE api/recipes/comments/delete
// desc    Delete a comment
// access  Private
router.delete("/comments/delete", passport.authenticate("jwt", { session: false }), (req, res) => {

  Recipe.findById(req.body.recipe_id)
    .then(recipe => {
      recipe.comments.pull({ _id: req.body.comment_id })
      //recipe.comments = recipe.comments.filter(com => com._id !== req.body.comment_id);
      recipe.save()
        .then(recipe => res.json(recipe))
        .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(404).json(err))
});

// route   post api/recipes/comments/edit
// desc    Edit a comment
// access  Private
router.post("/comments/edit", passport.authenticate("jwt", { session: false }), (req, res) => {

  Recipe.findById(req.body.recipe_id)
    .then(recipe => {
      let idx;
      recipe.comments.forEach((com, i) => {
        if (com._id == req.body.comment_id) {
          idx = i
        };
      })
      if (idx > -1) {
        // check if the logged in user owns this comment
        if (req.user.id != recipe.comments[idx].user_id) {
          res.json({ msg: "Permission denied" })
        } else {
          recipe.comments[idx].text = req.body.text;
          recipe.comments[idx].edited_at = Date.now();
          recipe.save()
            .then(recipe => res.json(recipe))
            .catch(err => res.status(500).json(err));
        }
      } else {
        res.status(404).json({ msg: "No comment Found" })
      }

    })
    .catch(err => res.status(404).json(err))
});


// route   post api/recipes/comments/delete
// desc    Delete a comment
// access  Private
router.delete("/comments/edit", passport.authenticate("jwt", { session: false }), (req, res) => {

  Recipe.findById(req.body.recipe_id)
    .then(recipe => {
      let idx;
      recipe.comments.forEach((com, i) => {
        if (com._id == req.body.comment_id) {
          idx = i
        };
      })
      if (idx > -1) {
        // check if the logged in user owns this comment
        if (req.user.id != recipe.comments[idx].user_id) {
          res.json({ msg: "Permission denied" })
        } else {
          recipe.comments = recipe.comments.filter(com => com._id != req.body.comment_id);
          recipe.save()
            .then(recipe => res.json(recipe))
            .catch(err => res.status(500).json(err));
        }
      } else {
        res.status(404).json({ msg: "No comment Found" })
      }

    })
    .catch(err => res.status(404).json(err))
});





module.exports = router;