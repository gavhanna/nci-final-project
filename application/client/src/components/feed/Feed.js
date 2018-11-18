import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecentRecipes, getRecipesByUsername } from "../../actions/recipesActions"
import { getUserInfo } from "../../actions/userActions"
import Spinner from "../common/Spinner"
import FeedCard from './FeedCard';
import ProfileCard from './ProfileCard';

class Feed extends Component {

  componentDidMount() {
    this.props.getRecentRecipes();
    this.props.getRecipesByUsername(this.props.auth.user.username);
    this.props.getUserInfo(this.props.auth.user.username);
  }

  render() {
    const recipes = this.props.recentRecipes.map(recipe => {
      return <FeedCard key={recipe._id} recipe={recipe} />
    })
    return (
      <div>
        <div className="row bg-primary text-white pl-0 pr-0 ml-0 mr-0 text-center">
          <div className="m-auto .col-10">
            <i className="fas fa-book-open m-auto" style={{ fontSize: "35px" }}></i>
            <h1 className="title-font text-center mt-1 mb-5 ml-auto mr-auto">Recent Recipes</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2 col-12">
            {
              this.props.user.name &&
              <ProfileCard user={this.props.user} recipes={this.props.recipes} />
            }
          </div>
          <div className="col-sm-8 col-12 mx-auto">
            {this.props.loading ? <Spinner /> : recipes}
          </div>
        </div>
      </div>
    )
  }
}

Feed.propTypes = {
  auth: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  recentRecipes: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.recipes.loading,
  recentRecipes: state.recipes.recentRecipes,
  recipes: state.recipes.recipes,
  user: state.user.info
})

export default connect(mapStateToProps, { getRecentRecipes, getRecipesByUsername, getUserInfo })(Feed);