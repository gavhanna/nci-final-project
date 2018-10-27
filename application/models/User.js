const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  blurb: {
    type: String,
    required: false
  },
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);