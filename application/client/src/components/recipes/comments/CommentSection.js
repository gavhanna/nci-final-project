import React, { Component } from 'react'
import Comment from "./Comment"
import CommentInput from "./CommentInput"
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CommentSection extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row mt-5 mb-5">
          <div className="col-sm-10 col-md-6 m-auto">
            <h2 className="m-auto title-font">Comments</h2>
            {
              this.props.selectedRecipe.comments && this.props.selectedRecipe.comments.length > 0
                ? this.props.selectedRecipe.comments.map((comment) => <Comment key={comment._id} comment={comment} recipe_id={this.props.recipe_id} />)
                : <p>No Comments Yet</p>
            }
            <CommentInput recipe_id={this.props.recipe_id} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  selectedRecipe: state.recipes.selectedRecipe,
})

export default connect(mapStateToProps)(CommentSection);