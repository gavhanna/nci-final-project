import React, { Component } from 'react'
import { Route } from "react-router-dom";
import Hero from "./Hero"
import RecipeBook from './RecipeBook';
import Recipes from './Recipes';
import Following from './Following';

class Profile extends Component {
  render() {
    return (
      <React.Fragment>
        <Hero />
        <Route exact path="/profile/" component={Recipes} />
        <Route path="/profile/recipes" component={Recipes} />
        <Route path="/profile/recipebook" component={RecipeBook} />
        <Route path="/profile/following" component={Following} />

      </React.Fragment>
    )
  }
}

export default Profile;