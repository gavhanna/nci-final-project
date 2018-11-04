import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class FollowCard extends Component {
  render() {
    console.log(this.props);
    return (
      <li className="list-group-item">
        <div className="media w-100">
          {/* <img className="media-object rounded-circle mr-3" src="https://fillmurray.com/301/300" /> */}
          <div className="media-body align-self-center">
            {/* <button className="btn btn-outline-primary btn-sm float-right">
              <span className="icon icon-add-user"></span> Follow
                  </button> */}
            <Link to={`/profile/${this.props.info.username}`}>
              <strong>@{this.props.info.username}</strong>
            </Link>
          </div>
        </div>
      </li>
    )
  }
}
