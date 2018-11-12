import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { getSpecificRecipe, clearSelectedRecipe } from "../../actions/recipesActions"
import DeleteRecipeButton from './DeleteRecipeButton';
import LikeRecipeButton from './LikeRecipeButton';
import UnlikeRecipeButton from './UnlikeRecipeButton';
import Spinner from "../common/Spinner";
import AddToRecipeBookButton from "./AddToRecipeBookButton";
import CommentSection from "./comments/CommentSection";

class Recipe extends Component {
  componentDidMount() {
    this.props.getSpecificRecipe(this.props.match.params.recipe_id);
  }

  componentWillUnmount() {
    this.props.clearSelectedRecipe();
  }

  isFavouriteRecipe = (likes) => {
    if (likes && likes.length > 0) {
      let there = false;
      likes.forEach(like => {
        if (like.username === this.props.auth.user.username) {
          there = true;
        }
      })
      return there;
    } else {
      return false;
    }
  }

  render() {

    const recipe = (
      <React.Fragment>
        <div className="row text-white bg-primary text-center d-flex flex-column p-3 mb-4">
          <div className="col-sm-12">
            <h2 className="title-font" style={{ fontSize: "4rem" }}>{this.props.selectedRecipe.title}</h2>
          </div>
        </div>
        <div className="container text-center mb-5">
          <p className="mt-3">"{this.props.selectedRecipe.desc}"</p>
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
                <div className="d-flex flex-column justify-content-around">
                  <img style={{ width: "auto", height: "30px" }} className="rounded-circle" src={this.props.selectedRecipe.user_id ? this.props.selectedRecipe.user_id.img_url ? this.props.selectedRecipe.user_id.img_url : "https://fillmurray.com/100/100" : null} alt="Creator Profile Pic" />
                </div>
                <div className="d-flex flex-column justify-content-around">
                  <span className="ml-1"> by {this.props.selectedRecipe.user_id && <Link to={`/profile/${this.props.selectedRecipe.user_id.username}`}>{this.props.selectedRecipe.user_id.username}</Link>}</span>
                </div>
              </div>
              <div className="d-flex">
                {
                  this.props.auth.isAuthenticated ?
                    <React.Fragment>
                      <div className="add-to-faves d-flex flex-column justify-content-center">
                        <span title="Like Recipe">
                          {
                            // Show a like button if the recipe is not already liked and vice versa
                            this.isFavouriteRecipe(this.props.selectedRecipe.likes) ?
                              <UnlikeRecipeButton recipe_id={this.props.selectedRecipe._id} /> :
                              <LikeRecipeButton recipe_id={this.props.selectedRecipe._id} />

                          }
                        </span>
                      </div>
                      <div className="add-to-faves d-flex flex-column justify-content-center">
                        <span title="Add to your Recipe Book">
                          <AddToRecipeBookButton recipe_id={this.props.selectedRecipe._id} />
                        </span>
                      </div>
                    </React.Fragment>
                    : null

                }
                {
                  this.props.selectedRecipe.user_id && this.props.auth.user.id === this.props.selectedRecipe.user_id._id ?
                    <React.Fragment>

                      <div className="add-to-faves d-flex flex-column justify-content-center">
                        <Link title="Edit" to={"/recipe/edit/" + this.props.selectedRecipe._id}>
                          <span className="badge badge-pill badge-info p-3 m-1">
                            <i className="far fa-edit"></i>
                          </span>
                        </Link>
                      </div>
                      <div className="add-to-faves d-flex flex-column justify-content-center">
                        <span title="Delete" className="align-middle m-1">
                          <DeleteRecipeButton recipe_id={this.props.selectedRecipe._id} />
                        </span>
                      </div>
                    </React.Fragment>
                    : null
                }
              </div>
            </div>
            <div className="col-md-6 col-sm-12 text-right">
              <span className="mr-2 mt-5 badge badge-pill badge-info p-2">
                {this.props.selectedRecipe.likes && this.props.selectedRecipe.likes.length}&nbsp;
                <i className="fas fa-heart" style={{ color: "salmon" }}></i>
              </span>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-12 col-md-6 mt-5">
              <h3>Ingredients</h3>
              <ul className="list-group">
                {this.props.selectedRecipe.ingredients && this.props.selectedRecipe.ingredients.map(i =>
                  <li key={i} className="list-group-item">
                    {i}
                  </li>
                )}

              </ul>
            </div>
            <div className="col-sm-12 col-md-6 mt-5">
              <h3>Method</h3>
              <ol className="list-group text-left">
                {this.props.selectedRecipe.method && this.props.selectedRecipe.method.map(m =>
                  <li key={m} className="list-group-item list-show">
                    {m}
                  </li>
                )}
              </ol>
            </div>
          </div>
          <hr />
          <CommentSection comments={this.props.selectedRecipe.comments} recipe_id={this.props.selectedRecipe._id} />
        </div>
      </React.Fragment>
    )
    return (
      <div>
        {this.props.loading ? <Spinner /> : recipe}
      </div>
    )
  }
}


Recipe.propTypes = {
  getSpecificRecipe: PropTypes.func.isRequired,
  clearSelectedRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  selectedRecipe: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  selectedRecipe: state.recipes.selectedRecipe,
  loading: state.recipes.loading
})

export default connect(mapStateToProps, { getSpecificRecipe, clearSelectedRecipe })(Recipe);
