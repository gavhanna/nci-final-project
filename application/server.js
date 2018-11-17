const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require("path");

const users = require("./routes/api/users");
const recipes = require("./routes/api/recipes");
const recipebooks = require("./routes/api/recipebooks");
const shoppinglist = require("./routes/api/shoppinglist");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

// User Routes
app.use("/api/users", users);
// Recipe Routes
app.use("/api/recipes", recipes);
// RecipeBook Routes
app.use("/api/recipebooks", recipebooks);
// Shopping list Routes
app.use("/api/shoppinglist", shoppinglist);


// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
