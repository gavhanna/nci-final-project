import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteRecipe } from "../../actions/recipesActions"

class DeleteRecipeButton extends Component {

  onRecipeDelete = (e) => {
    if (window.confirm("Really delete?")) {
      this.props.deleteRecipe(this.props.recipe_id)
    }
  }

  render() {
    return (
      <button
        className="btn btn-pill ml-2 btn-warning"
        title="Delete Recipe"
        onClick={this.onRecipeDelete}>
        <i className="far fa-trash-alt" style={{ pointerEvents: "none" }}></i>
      </button>
    )
  }
}

DeleteRecipeButton.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteRecipe: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteRecipe })(DeleteRecipeButton);
