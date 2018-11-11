import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecentRecipes } from "../../actions/recipesActions"
import Spinner from "../common/Spinner"
import FeedCard from './FeedCard';

class Feed extends Component {

  componentDidMount() {
    this.props.getRecentRecipes();
  }

  render() {
    const recipes = this.props.recentRecipes.map(recipe => {
      return <FeedCard key={recipe._id} recipe={recipe} />
    })
    return (
      <div>
        <div className="row bg-primary text-white pl-0 pr-0 ml-0 mr-0 text-center">
          <div className="m-auto">
            <i className="fas fa-book-open m-auto" style={{ fontSize: "35px" }}></i>
            <h1 className="title-font text-center mt-1 mb-5 ml-auto mr-auto">Recent Recipes</h1>
          </div>
        </div>
        {this.props.loading ? <Spinner /> : recipes}
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
  recentRecipes: state.recipes.recentRecipes
})

export default connect(mapStateToProps, { getRecentRecipes })(Feed);