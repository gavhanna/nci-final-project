import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getSpecificRecipe, clearSelectedRecipe } from "../../actions/recipesActions"
import EditRecipeForm from './EditRecipeForm';

class EditRecipe extends Component {

  componentDidMount() {
    this.props.getSpecificRecipe(this.props.match.params.recipe_id);
  }

  componentWillUnmount() {
    this.props.clearSelectedRecipe();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.selectedRecipe.title && <EditRecipeForm recipe={this.props.selectedRecipe} />}
      </React.Fragment>

    )
  }
}

EditRecipe.propTypes = {
  auth: PropTypes.object.isRequired,
  selectedRecipe: PropTypes.object.isRequired,
  getSpecificRecipe: PropTypes.func.isRequired,
  clearSelectedRecipe: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  selectedRecipe: state.recipes.selectedRecipe
})

export default connect(mapStateToProps, { getSpecificRecipe, clearSelectedRecipe })(EditRecipe);
