import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getSpecificRecipe } from "../../actions/recipesActions"

class Recipe extends Component {
  componentDidMount() {
    this.props.getSpecificRecipe(this.props.match.params.recipe_id);
  }

  render() {

    const loading = (
      <p>Loading</p>
    )

    const recipe = (
      <div className="container text-center mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="title-font" style={{ fontSize: "4rem" }}>{this.props.selectedRecipe.title}</h2>
            <p>{this.props.selectedRecipe.desc}</p>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="img p-3">
              <img src={this.props.selectedRecipe.img_url} alt="Recipe" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6 col-sm-12 m-auto">
            <ul className="list-group p-3">
              <li className="list-group-item d-flex justify-content-content-between">
                <span>Preperation Time</span>
                <span className="ml-auto">{this.props.selectedRecipe.preptime} mins</span>
              </li>
              <li className="list-group-item d-flex justify-content-content-between">
                <span>Cooking Time</span>
                <span className="ml-auto">{this.props.selectedRecipe.cooktime} mins</span>
              </li>
              <li className="list-group-item d-flex justify-content-content-between">
                <span>Serves</span>
                <span className="ml-auto">{this.props.selectedRecipe.serves}</span>
              </li>
              <li className="list-group-item d-flex justify-content-content-between">
                <span>Dietary</span>
                <span className="ml-auto">{this.props.selectedRecipe.dietary}</span>
              </li>
              <li className="list-group-item d-flex justify-content-content-between">
                <span>Meal</span>
                <span className="ml-auto">{this.props.selectedRecipe.meal}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="row mr-2">
          <div className="col-md-6 col-sm-12 d-flex justify-content-between">
            <div className="creator ml-3 d-flex flex-row">
              <img style={{ width: "auto", height: "30px" }} className="rounded-circle" src="https://fillmurray.com/300/300" alt="Creator Profile Pic" />
              <div className="d-flex flex-column justify-content-around">
                <span className="ml-1"> by {this.props.selectedRecipe.user_id && this.props.selectedRecipe.user_id.username}</span>
              </div>
            </div>
            <div className="add-to-faves d-flex flex-column justify-content-center">
              <span className="align-middle">Add to favourites</span>
            </div>
            <div className="add-to-faves d-flex flex-column justify-content-center">
              <span className="align-middle">Print Recipe</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-12 col-md-6 mt-5">
            <h3>Ingredients</h3>
            <ul className="list-group">
              {this.props.selectedRecipe.ingredients && this.props.selectedRecipe.ingredients.map(i =>
                <li className="list-group-item">
                  {i}
                </li>
              )}

            </ul>
          </div>
          <div className="col-sm-12 col-md-6 mt-5">
            <h3>Method</h3>
            <ol className="list-group text-left">
              {this.props.selectedRecipe.method && this.props.selectedRecipe.method.map(m =>
                <li className="list-group-item list-show">
                  {m}
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
    )
    return (
      <div>
        {this.props.selectedRecipe.title ? recipe : loading}
      </div>
    )
  }
}


Recipe.propTypes = {
  getSpecificRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  selectedRecipe: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  selectedRecipe: state.recipes.selectedRecipe
})

export default connect(mapStateToProps, { getSpecificRecipe })(Recipe);
