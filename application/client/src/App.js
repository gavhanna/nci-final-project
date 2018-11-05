import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken"
import { setCurrentUser, logoutUser } from "./actions/authActions"
import store from "./store"

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Feed from "./components/feed/Feed";
import Profile from "./components/user/profile/Profile";

import './App.css';
import Recipe from './components/recipes/Recipe';
import RecipeForm from './components/recipes/RecipeForm';
import EditRecipe from './components/recipes/EditRecipe';
import EditProfile from './components/user/profile/editProfile/EditProfile';

// check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token for user info and expiry date
  const decoded = jwt_decode(localStorage.jwtToken);
  // ser user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/feed" component={Feed} />
            <Route path="/profile/:username" component={Profile} />
            <Route exact path="/edit/:username" component={EditProfile} />
            <Route exact path="/recipe/create" component={RecipeForm} />
            <Route exact path="/recipe/show/:recipe_id" component={Recipe} />
            <Route exact path="/recipe/edit/:recipe_id" component={EditRecipe} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
