import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addToRecipeBook } from "../../actions/recipebookActions"

class AddToRecipeBookButton extends Component {

  onAddRecipeToRecipeBook = (e) => {
    e.preventDefault();
    this.props.addToRecipeBook(this.props.recipe_id);
  }


  render() {
    return (
      <button
        className="btn btn-pill btn-info p-3"
        style={{ maxHeight: "44px" }}
        title="Add to your Recipe Book"
        onClick={this.onAddRecipeToRecipeBook}>
        <i className="fas fa-book" style={{ pointerEvents: "none" }}></i>
      </button>
    )
  }
}

AddToRecipeBookButton.propTypes = {
  auth: PropTypes.object.isRequired,
  addToRecipeBook: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  recipeBook: state.recipebook
})

export default connect(mapStateToProps, { addToRecipeBook })(AddToRecipeBookButton);