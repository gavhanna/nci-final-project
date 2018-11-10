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
      <React.Fragment>
        <div className="container-fill-height landing-page">
          <div className="container-content-middle text-center">
            <h1 className="title-font" style={{ fontSize: "5rem" }}>Recipe Book</h1>
            <p>Create and share your favourite recipes!</p>
            <hr />
            <Link to="/register" className="btn btn-lg btn-pill btn-primary m-1">Register</Link>
            <Link to="/login" className="btn btn-lg btn-pill btn-info m-1">Login</Link>
          </div>
        </div>
        <div className="container-fill-height bg-light landing-page-inverted">
          <div className="container-content-middle text-center">
            <div className="row pl-0 pr-0 m-0">
              <div className="col-12 col-md-5 m-auto">
                <h3 className="title-font">Upload</h3>
                <p>Create and upload your own recipes to share with others</p>
                <h3 className="title-font">Curate</h3>
                <p>Add any recipes to your own personal Recipe Book</p>
              </div>
              <div className="col-12 col-md-5 m-auto">
                <h3 className="title-font">Follow</h3>
                <p>Follow your favourite creators and try out their latest recipes</p>
                <h3 className="title-font">Discuss</h3>
                <p>Talk about each recipe in the comment section</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
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