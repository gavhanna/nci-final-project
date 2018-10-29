const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const RecipeSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  cooktime: {
    type: Number,
    required: true
  },
  preptime: {
    type: Number,
    required: false
  },
  serves: {
    type: Number,
    required: false
  },
  ingredients: [{ type: String }],
  method: [{ type: String }],
  img_url: {
    type: String,
    required: false
  },
  meal: {
    type: String,
    required: true
  },
  dietary: {
    type: String,
    required: true
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
  comments: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      username: {
        type: String
      },
      text: {
        type: String,
        required: true
      },
      created_at: {
        type: Date,
        default: Date.now
      },
      edited_at: {
        type: Date
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  edited_at: {
    type: Date,
    required: false
  }
});

module.exports = Recipe = mongoose.model("recipes", RecipeSchema);