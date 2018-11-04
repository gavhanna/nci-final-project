import React, { Component } from 'react'

export default class FollowCard extends Component {
  render() {
    return (
      <div className="media w-100">
        <img className="media-object rounded-circle mr-3" src="https://fillmurray.com/301/300" />
        <div className="media-body align-self-center">
          <button className="btn btn-outline-primary btn-sm float-right">
            <span className="icon icon-add-user"></span> Follow
                  </button>
          <strong>Jacob Thornton</strong>
          <small>@fat - San Francisco</small>
        </div>
      </div>
    )
  }
}
