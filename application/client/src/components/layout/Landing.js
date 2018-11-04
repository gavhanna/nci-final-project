import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";


class Landing extends Component {

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile/" + this.props.auth.user.username);
    }
  }

  render() {
    return (
      <div className="container-fill-height landing-page">
        <div className="container-content-middle text-center">
          <h1 className="title-font" style={{ fontSize: "5rem" }}>Recipe Book</h1>
          <p>Create and share your favourite recipes!</p>
          <hr />
          <Link to="/register" className="btn btn-lg btn-pill btn-primary m-1">Register</Link>
          <Link to="/login" className="btn btn-lg btn-pill btn-info m-1">Login</Link>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing);