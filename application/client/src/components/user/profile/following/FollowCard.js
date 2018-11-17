import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class FollowCard extends Component {
  render() {
    return (
      <li className="list-group-item">
        <div className="media w-100">
          <div className="media-body align-self-center">
            <Link to={`/profile/${this.props.info.username}`}>
              <strong>@{this.props.info.username}</strong>
            </Link>
          </div>
        </div>
      </li>
    )
  }
}
