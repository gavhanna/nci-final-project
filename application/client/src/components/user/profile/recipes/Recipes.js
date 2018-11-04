import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecipesByUsername } from "../../../../actions/recipesActions"
import { getUserInfo } from "../../../../actions/userActions"
import RecipeCard from './RecipeCard';
import Spinner from "../../../common/Spinner"

class Recipes extends Component {
  componentDidMount() {
    this.props.getUserInfo(this.props.match.params.username)
    this.props.getRecipesByUsername(this.props.match.params.username)
  }

  render() {
    const hasRecipes = (
      this.props.recipes.recipes.map(recipe => {
        return (<RecipeCard key={recipe._id} recipe={recipe} />)
      })
    )

    const loaded = (
      <div className="profile-recipes container mt-3">
        <div className="row justify-content-around">
          {this.props.user.loading ? null : <h2 className="m-auto title-font text-center w-100">{this.props.user.info.name && this.props.user.info.name.split(" ")[0]}'s Recipes</h2>}
          <div className="card-deck">
            {this.props.recipes.recipes ? hasRecipes : null}
          </div>
        </div>
      </div>
    )

    const loading = (
      <Spinner />
    )

    return (
      <React.Fragment>
        {this.props.recipes.loading ? loading : loaded}
      </React.Fragment>
    )
  }
}

Recipes.propTypes = {
  getRecipesByUsername: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  recipes: state.recipes,
  user: state.user
})

export default connect(mapStateToProps, { getRecipesByUsername, getUserInfo })(Recipes);