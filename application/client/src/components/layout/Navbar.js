import React from 'react'
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"

class Navbar extends React.Component {

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" exact to="/profile">{user.username}</NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" exact to="/feed">Feed</NavLink>
        </li>
        <li className="nav-item">
          <button className="nav-link btn btn-pill btn-primary" style={{ cursor: "pointer" }} onClick={this.onLogoutClick}>Logout</button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" exact to="/register">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" exact to="/login">Login</NavLink>
        </li>
      </ul>
    );

    return (
      <React.Fragment>
        <nav className="navbar navbar-toggleable-sm fixed-top navbar-inverse bg-primary app-navbar">
          <button className="navbar-toggler navbar-toggler-right hidden-md-up" type="button" data-toggle="collapse" data-target="#navbarResponsive"
            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <NavLink className="navbar-brand" exact to="/">
            <span className="title-font">Recipe Book</span>
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarResponsive">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </nav>
      </React.Fragment>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Navbar);