import React, { Component } from 'react'
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../../actions/recipesActions";

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
            this.props.auth.user.id === comment.user._id
              ? <button
                className="btn btn-pill btn-warning pull-right"
                style={{ position: "absolute", right: "5px", bottom: "10px" }}
                onClick={this.onDelete}
              >
                <i className="far fa-trash-alt"></i>
              </button>
              : null
          }
        </div>
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