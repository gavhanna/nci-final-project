import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import logo from "../common/logo.svg";
import create from "./landingGifs/create-recipe.gif";
import recipebook from "./landingGifs/rb-opt.gif";
import follow from "./landingGifs/follow.gif";
import comment from "./landingGifs/comment.gif";


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
            <img src={logo} alt="Logo" style={{ width: "150px", height: "auto", marginBottom: "-20px" }} />
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
              <div className="col-12 col-md-12 col-lg-6 m-auto">
                <h3 className="title-font">Upload</h3>
                <img src={create} style={{ width: "350px", maxWidth: "95vw", height: "auto" }} alt="Create Recipes" />
                <p>Create and upload your own recipes to share with others</p>
                <h3 className="title-font">Curate</h3>
                <img src={recipebook} style={{ width: "350px", maxWidth: "95vw", height: "auto" }} alt="Curate a Recipe Book" />
                <p>Add any recipes to your own personal Recipe Book</p>
              </div>
              <div className="col-12 col-md-5 m-auto">
                <h3 className="title-font">Follow</h3>
                <img src={follow} style={{ width: "350px", maxWidth: "95vw", height: "auto" }} alt="Follow others" />
                <p>Follow your favourite creators and try out their latest recipes</p>
                <h3 className="title-font">Discuss</h3>
                <img src={comment} style={{ width: "350px", maxWidth: "95vw", height: "auto" }} alt="Follow others" />
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