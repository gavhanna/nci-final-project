import React from 'react'

const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-toggleable-sm fixed-top navbar-inverse bg-primary app-navbar">
        <button className="navbar-toggler navbar-toggler-right hidden-md-up" type="button" data-toggle="collapse" data-target="#navbarResponsive"
          aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <a className="navbar-brand" href="index.html">
          <span className="title-font">Recipe Book</span>
        </a>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">

            <li className="nav-item">
              <a className="nav-link" href="register.html">Register</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="login.html">Login</a>
            </li>
          </ul>

        </div>
      </nav>
    </React.Fragment>
  )
}

export default Navbar;