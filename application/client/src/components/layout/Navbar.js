import React from 'react'
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getCurrentUserRecipeBook } from "../../actions/recipebookActions";

class Navbar extends React.Component {

  // TODO: find a better place to call this method
  componentDidMount() {
    this.props.getCurrentUserRecipeBook(this.props.auth.user.id);
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    if (window.confirm("Really log out?")) {
      this.props.logoutUser();
      window.location.href = "/";
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto" data-toggle="collapse" data-target="#navbarResponsive">
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/feed" title="Feed">
            <i className="fas fa-globe-africa"></i><span className="d-inline d-sm-none"> Recipes Feed</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/" title="Profile">
            <i className="far fa-user"></i><span className="d-inline d-sm-none py-5"> Profile</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/recipe/create" title="Create Recipe">
            <i className="fas fa-folder-plus"></i><span className="d-inline d-sm-none"> Create New Recipe</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/shoppinglist" title="My Shopping List">
            <i className="fas fa-list"></i><span className="d-inline d-sm-none"> Shopping List</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <button className="nav-link btn btn-pill btn-primary" style={{ cursor: "pointer" }} title="Logout" onClick={this.onLogoutClick}>
            <i className="fas fa-sign-out-alt"></i><span className="d-inline d-sm-none"> Logout</span>
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto" data-toggle="collapse" data-target="#navbarResponsive">
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
            <span className="title-font">Recipe Book <i className="fas fa-book-open"></i></span>
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
  getCurrentUserRecipeBook: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, getCurrentUserRecipeBook })(Navbar);