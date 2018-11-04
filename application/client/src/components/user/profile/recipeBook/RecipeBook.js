import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getUserRecipeBook } from "../../../../actions/recipebookActions";
import Spinner from "../../../common/Spinner"
import RecipeCard from '../recipes/RecipeCard';

class RecipeBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }

  }

  componentDidMount() {
    // this.props.getUserRecipeBook(this.props.auth.user.id);
    // this.setState({
    //   user: this.props.auth.user
    // })
  }

  render() {
    const loading = (<Spinner />);
    const loaded = (
      <React.Fragment>
        <h2 className="m-3 text-center title-font">{this.props.auth.user.name.split(" ")[0]}'s Recipe Book</h2>
        <div className="meal-group mt-5 mb-5">
          <h3 className="title-font text-center">Breakfast</h3>
          <div className="row">
            {
              this.props.recipebook.selected.length > 0 ?
                this.props.recipebook.selected.map(recipe => (
                  recipe.meal === "Breakfast" ? <RecipeCard key={recipe._id} recipe={recipe} /> : null
                ))
                : <p className="text-center">No recipes yet!</p>
            }
          </div>
          <div className="meal-group mt-5 mb-5">
            <h3 className="title-font text-center">Brunch</h3>
            <div className="row">
              {
                this.props.recipebook.selected.length > 0 ?
                  this.props.recipebook.selected.map(recipe => (
                    recipe.meal === "Brunch" ? <RecipeCard key={recipe._id} recipe={recipe} /> : null
                  ))
                  : <p className="text-center">No recipes yet!</p>
              }
            </div>
          </div>
          <div className="meal-group mt-5 mb-5">
            <h3 className="title-font text-center">Lunch</h3>
            <div className="row">
              {
                this.props.recipebook.selected.length > 0 ?
                  this.props.recipebook.selected.map(recipe => (
                    recipe.meal === "Lunch" ? <RecipeCard key={recipe._id} recipe={recipe} /> : null
                  ))
                  : <p className="text-center">No recipes yet!</p>
              }
            </div>
          </div>
          <div className="meal-group mt-5 mb-5">
            <h3 className="title-font text-center">Dinner</h3>
            <div className="row">
              {
                this.props.recipebook.selected.length > 0 ?
                  this.props.recipebook.selected.map(recipe => (
                    recipe.meal === "Dinner" ? <RecipeCard key={recipe._id} recipe={recipe} /> : null
                  ))
                  : <p className="text-center">No recipes yet!</p>
              }
            </div>
          </div>
          <div className="meal-group mt-5 mb-5">
            <h3 className="title-font text-center">Supper</h3>
            <div className="row">
              {
                this.props.recipebook.selected.length > 0 ?
                  this.props.recipebook.selected.map(recipe => (
                    recipe.meal === "Supper" ? <RecipeCard key={recipe._id} recipe={recipe} /> : null
                  ))
                  : <p className="text-center">No recipes yet!</p>
              }
            </div>
          </div>
          <div className="meal-group mt-5 mb-5">
            <h3 className="title-font text-center">Snacks</h3>
            <div className="row">
              {
                this.props.recipebook.selected.length > 0 ?
                  this.props.recipebook.selected.map(recipe => (
                    recipe.meal === "Snack" ? <RecipeCard key={recipe._id} recipe={recipe} /> : null
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

export default connect(mapStateToProps, { getUserRecipeBook })(RecipeBook);