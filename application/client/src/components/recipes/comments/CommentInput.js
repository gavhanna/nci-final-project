import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createComment } from "../../../actions/recipesActions"
import classnames from "classnames"

class CommentInput extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange = (e) => {
    this.setState({ text: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      text: this.state.text,
      recipe_id: this.props.recipe_id
    }
    this.props.createComment(commentData);
    this.setState({ text: "" });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="row mt-5 mb-5">
        <div className="col-12 m-auto">
          <h3>Add Your Thoughts</h3>
          <div className="">
            <div className="card-body">
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.text
                    })}
                    value={this.state.text}
                    onChange={this.onChange}></textarea>
                  {errors.text && (<div className="invalid-feedback">{errors.text}</div>)}
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-pill btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CommentInput.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  recipe_id: state.recipes.selectedRecipe._id
})

export default connect(mapStateToProps, { createComment })(CommentInput);