import React, { Component } from 'react'
import { connect } from "react-redux";
import { editComment } from "../../../actions/recipesActions"
import PropTypes from "prop-types"

class EditCommentModal extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    }
  }

  componentDidMount() {
    this.setState({
      text: this.props.comment.text
    })
  }

  onTextEdit = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editComment(this.props.comment._id, this.props.recipe_id, this.state.text);
    this.hideActiveModal();
  }

  // https://stackoverflow.com/questions/49515925/react-router-dom-link-on-click-close-bootstrap-modal-window
  hideActiveModal = () => {
    const modal = document.getElementsByClassName('modal show')[0];
    const fade = document.getElementsByClassName('modal-backdrop fade')[0];
    modal.className = modal.className.replace('show', '');
    fade.className = fade.className.replace('show', '');
  };
  render() {
    return (
      <React.Fragment>
        <div className="modal fade" id={`modal-${this.props.comment._id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Comment</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <textarea
                      name="text"
                      id="text"
                      className="form-control form-control-lg"
                      type="text"
                      value={this.state.text}
                      placeholder="Say something :D"
                      onChange={this.onTextEdit}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary float-right"><i className="fas fa-share-square"></i> Submit</button>
                  <button type="button" className="btn btn-secondary mr-1 float-right" data-dismiss="modal">Cancel</button>
                </form>
                <div className="modal-footer">
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

EditCommentModal.propTypes = {
  auth: PropTypes.object.isRequired,
  editComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { editComment })(EditCommentModal);