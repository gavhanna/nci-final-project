import React, { Component } from 'react'

class Following extends Component {
  render() {
    return (
      <div className="text-center mt-5">
        <div className="row">
          <div className="col-md-3 col-sm-12 ml-auto mt-5">
            <h3>Followers</h3>
            <ul className="media-list media-list-users list-group">
              <li className="list-group-item">
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
              </li>

            </ul>
          </div>
          <div className="col-md-3 col-sm-12 mr-auto mt-5">
            <h3>Following</h3>
            <ul className="media-list media-list-users list-group">
              <li className="list-group-item">
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
              </li>
              <li className="list-group-item">
                <div className="media w-100">
                  <img className="media-object rounded-circle mr-3" src="https://fillmurray.com/300/302" />
                  <div className="media-body align-self-center">
                    <button className="btn btn-outline-primary btn-sm float-right">
                      <span className="icon icon-add-user"></span> Follow
                  </button>
                    <strong>Dave Gamache</strong>
                    <small>@dhg - Palo Alto</small>
                  </div>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>
    )
  }
}



export default Following;
