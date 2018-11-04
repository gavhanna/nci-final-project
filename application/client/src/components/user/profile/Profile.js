import React, { Component } from 'react'
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Hero from "./Hero"
import RecipeBook from './recipeBook/RecipeBook';
import Recipes from './recipes/Recipes';
import Following from './Following';
import { getUserInfo } from "../../../actions/userActions"
import { getUserRecipeBook } from "../../../actions/recipebookActions"

class Profile extends Component {
  componentDidMount() {
    this.props.getUserInfo(this.props.match.params.username)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.info.id) {
      this.props.getUserRecipeBook(nextProps.user.info.id)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Hero />
        <Route exact path="/profile/:username" component={Recipes} />
        <Route path="/profile/:username/recipes" component={Recipes} />
        <Route path="/profile/:username/recipebook" component={RecipeBook} />
        <Route path="/profile/:username/following" component={Following} />
      </React.Fragment>
    )
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  getUserRecipeBook: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

export default connect(mapStateToProps, { getUserInfo, getUserRecipeBook })(Profile);