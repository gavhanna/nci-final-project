import React, { Component } from 'react'
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../../actions/recipesActions";
import EditCommentModal from './EditCommentModal';

class Comment extends Component {
  onDelete = (e) => {
    const commentData = {
      comment_id: this.props.comment._id,
      recipe_id: this.props.recipe_id
    }
    //console.log(commentData);
    if (window.confirm("Delete comment?")) {
      this.props.deleteComment(commentData);
    }
  }

  render() {
    const { comment } = this.props;
    let edited_at;
    if (comment.edited_at) {
      edited_at = comment.edited_at;
    }
    return (
      <div className="card text-left">
        <div className="card-header d-flex flex-row justify-content-between">
          <span>
            <img className="rounded-circle" width="30" src={comment.user.img_url ? comment.user.img_url : "https://www.fillmurray.com/100/100"} alt="User" />
            <Link to={`/profile/${comment.user.username}`}><span> {comment.user.username}</span></Link>
          </span>
          <span className="p-1 small">
            {moment(comment.created_at).fromNow()}
          </span>
        </div>
        <div className="card-body">
          <p className="p-4">
            {comment.text}
          </p>
          {
            edited_at ? <div className="small text-right mx-2 my-0">
              <em>last edited: {moment(edited_at).format('h:mm a, MMMM Do YYYY')}</em>
            </div> : null
          }
          {
            this.props.auth.user.id === comment.user._id ?
              <div className="d-flex flex-row justify-content-end">
                <button
                  className="btn btn-pill btn-info mx-2 mb-2"
                  title="Edit Comment"
                  data-toggle="modal"
                  // have to add comment something to each modal id to make sure
                  // the correct modal fires for each comment
                  data-target={`#modal-${comment._id}`}
                  style={{ cursor: "pointer" }}
                >

                  <i className="far fa-edit"></i>
                </button>
                <button
                  title="Delete Comment"
                  className="btn btn-pill btn-warning mr-2 mb-2"
                  // style={{ position: "absolute", right: "5px", bottom: "10px" }}
                  onClick={this.onDelete}
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
              : null
          }
        </div>
        <EditCommentModal comment={comment} recipe_id={this.props.recipe_id} />
      </div>
    )
  }
}

Comment.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(Comment);