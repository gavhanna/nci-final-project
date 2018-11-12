import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { likeRecipe } from "../../actions/recipesActions"

class LikeRecipeButton extends Component {

  onLikeRecipe = (e) => {
    this.props.likeRecipe(this.props.recipe_id)
  }

  render() {
    return (
      <button
        className="btn btn-pill btn-info p-3 m-1"
        style={{ maxHeight: "44px", marginTop: "8px" }}
        title="Like this Recipe"
        onClick={this.onLikeRecipe}>
        <i className="fas fa-heart" style={{ pointerEvents: "none" }}></i>
      </button>
    )
  }
}

LikeRecipeButton.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { likeRecipe })(withRouter(LikeRecipeButton));
