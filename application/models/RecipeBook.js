const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const RecipeBookSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  recipes: [{
    type: Schema.Types.ObjectId,
    ref: 'recipes'
  }]
});

module.exports = RecipeBook = mongoose.model("recipebooks", RecipeBookSchema);