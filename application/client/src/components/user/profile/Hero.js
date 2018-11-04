import React, { Component } from 'react'
import NavLink from 'react-router-dom/NavLink';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Hero extends Component {
  render() {
    const user = this.props.user.info;
    return (
      <div className="col">
        <div className="profile-header text-center" style={{ background: "#3097d1" }}>
          <div className="container-fluid">
            <div className="container-inner">
              <img className="rounded-circle media-object" src="https://fillmurray.com/300/300" alt="Profile" />
              <h3 className="profile-header-user">{user.name}</h3>
              <p className="small text-white">@{user.username}</p>
              <p className="profile-header-bio">{user.blurb}</p>
            </div>
          </div>
          <nav className="profile-header-nav">
            <ul className="nav nav-tabs justify-content-center">
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" exact to={`/profile/${this.props.user.info.username}`} title="Recipes"><i className="fas fa-list-ul"></i></NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to={`/profile/${this.props.user.info.username}/recipebook`} title="Recipe Book"><i className="fas fa-book-open"></i></NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to={`/profile/${this.props.user.info.username}/following`} title="Following"><i className="fas fa-users"></i></NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

Hero.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

export default connect(mapStateToProps)(Hero);