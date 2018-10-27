import React from 'react'
import { NavLink } from "react-router-dom";

const Navbar = () => {
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
          <ul className="navbar-nav ml-auto">

            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" exact to="/register">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" exact to="/login">Login</NavLink>
            </li>
          </ul>

        </div>
      </nav>
    </React.Fragment>
  )
}

export default Navbar;