import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserRecipes } from "../../../../actions/recipesActions"
import RecipeCard from './RecipeCard';

class Recipes extends Component {
  componentDidMount() {
    this.props.getUserRecipes(this.props.auth.user.id)
  }

  render() {

    const hasRecipes = (
      this.props.recipes.recipes.map(recipe => {
        return (<RecipeCard key={recipe._id} recipe={recipe} />)
      })
    )



    return (
      <div className="profile-recipes container mt-3">
        <div className="row">
          {this.props.recipes.recipes ? <h2 className="m-auto">Recipes</h2> : null}
          <div className="row">
            {this.props.recipes.recipes ? hasRecipes : null}
          </div>
        </div>
      </div>
    )
  }
}

Recipes.propTypes = {
  getUserRecipes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  recipes: state.recipes
})

export default connect(mapStateToProps, { getUserRecipes })(Recipes);