import React, { Component } from 'react'
import Link from 'react-router-dom/Link';
import NavLink from 'react-router-dom/NavLink';

class Hero extends Component {
  render() {
    return (
      <div className="col">
        <div className="profile-header text-center" style={{ background: "#3097d1" }}>
          <div className="container-fluid">
            <div className="container-inner">
              <img className="rounded-circle media-object" src="https://fillmurray.com/300/300" alt="Profile" />
              <h3 className="profile-header-user">Dave Gamache</h3>
              <p className="profile-header-bio">I wish i was a little bit taller, wish i was a baller, i wish i could
                  cook..</p>
            </div>
          </div>
          <nav className="profile-header-nav">
            <ul className="nav nav-tabs justify-content-center">
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" exact to="/profile">Recipes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/profile/recipebook">Recipe Book</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/profile/following">Following</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default Hero;