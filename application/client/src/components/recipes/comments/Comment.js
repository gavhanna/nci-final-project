import React, { Component } from 'react'
import { Link } from "react-router-dom";
import moment from "moment";

export default class Comment extends Component {
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
        </div>
      </div>
    )
  }
}
