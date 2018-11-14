import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getUserRecipeBook, getCurrentUserRecipeBook } from "../../../../actions/recipebookActions";
import Spinner from "../../../common/Spinner"
import RecipeBookCard from './RecipeBookCard';

class RecipeBook extends Component {

  componentDidMount() {
    this.props.getCurrentUserRecipeBook(this.props.auth.user.id);
  }

  render() {
    const loading = (<Spinner />);
    const loaded = (
      <React.Fragment>
        <h2 className="m-3 text-center title-font">{this.props.user.info.name && this.props.user.info.name.split(" ")[0]}'s Recipe Book</h2>
        <div className="meal-group mt-5 mb-5">
          <h3 className="title-font text-center">Breakfast</h3>
          <div className="card-deck justify-content-around">
            {
              this.props.recipebook.selected.recipes && this.props.recipebook.selected.recipes.length > 0 ?
                this.props.recipebook.selected.recipes.map(recipe => (
                  recipe.meal === "Breakfast" ? <RecipeBookCard key={recipe._id} recipe={recipe} /> : null
                ))
                : <p className="text-center">No recipes yet!</p>
            }
          </div>
          <div className="meal-group mt-5 mb-5">
            <h3 className="title-font text-center">Brunch</h3>
            <div className="card-deck justify-content-around">
              {
                this.props.recipebook.selected.recipes && this.props.recipebook.selected.recipes.length > 0 ?
                  this.props.recipebook.selected.recipes.map(recipe => (
                    recipe.meal === "Brunch" ? <RecipeBookCard key={recipe._id} recipe={recipe} /> : null
                  ))
                  : <p className="text-center">No recipes yet!</p>
              }
            </div>
          </div>
          <div className="meal-group mt-5 mb-5">
            <h3 className="title-font text-center">Lunch</h3>
            <div className="card-deck justify-content-around">
              {
                this.props.recipebook.selected.recipes && this.props.recipebook.selected.recipes.length > 0 ?
                  this.props.recipebook.selected.recipes.map(recipe => (
                    recipe.meal === "Lunch" ? <RecipeBookCard key={recipe._id} recipe={recipe} /> : null
                  ))
                  : <p className="text-center">No recipes yet!</p>
              }
            </div>
          </div>
          <div className="meal-group mt-5 mb-5">
            <h3 className="title-font text-center">Dinner</h3>
            <div className="card-deck justify-content-around">
              {
                this.props.recipebook.selected.recipes && this.props.recipebook.selected.recipes.length > 0 ?
                  this.props.recipebook.selected.recipes.map(recipe => (
                    recipe.meal === "Dinner" ? <RecipeBookCard key={recipe._id} recipe={recipe} /> : null
                  ))
                  : <p className="text-center">No recipes yet!</p>
              }
            </div>
          </div>
          <div className="meal-group mt-5 mb-5">
            <h3 className="title-font text-center">Supper</h3>
            <div className="card-deck justify-content-around">
              {
                this.props.recipebook.selected.recipes && this.props.recipebook.selected.recipes.length > 0 ?
                  this.props.recipebook.selected.recipes.map(recipe => (
                    recipe.meal === "Supper" ? <RecipeBookCard key={recipe._id} recipe={recipe} /> : null
                  ))
                  : <p className="text-center">No recipes yet!</p>
              }
            </div>
          </div>
          <div className="meal-group mt-5 mb-5">
            <h3 className="title-font text-center">Snacks</h3>
            <div className="card-deck justify-content-around">
              {
                this.props.recipebook.selected.recipes && this.props.recipebook.selected.recipes.length > 0 ?
                  this.props.recipebook.selected.recipes.map(recipe => (
                    recipe.meal === "Snack" ? <RecipeBookCard key={recipe._id} recipe={recipe} /> : null
                  ))
                  : <p className="text-center">No recipes yet!</p>
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    )
    return (
      <React.Fragment>
        {this.props.recipebook.loading ? loading : loaded}
      </React.Fragment>
    )
  }
}

RecipeBook.propTypes = {
  getUserRecipeBook: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  recipebook: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  recipebook: state.recipebook,
  user: state.user
})

export default connect(mapStateToProps, { getUserRecipeBook, getCurrentUserRecipeBook })(RecipeBook);