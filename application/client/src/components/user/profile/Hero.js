import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { followUser, unfollowUser } from "../../../actions/userActions"
import { removeFollowing, addFollowing } from "../../../actions/authActions"
import Spinner from "../../common/Spinner"

class Hero extends Component {
  constructor() {
    super();
    this.state = {
      active: "recipes"
    }
  }

  componentDidMount() {
    const locationArray = window.location.pathname.split("/");
    const currentSelectedLink = locationArray[locationArray.length - 1];
    if (currentSelectedLink === "recipebook") {
      this.setState({ active: "recipebook" });
    } else if (currentSelectedLink === "following") {
      this.setState({ active: "following" });
    } else {
      this.setState({ active: "recipes" });
    }
  }

  navClick = e => {
    if (e.target.href) {
      const current = e.target.href.split("/").pop();
      if (current === "recipebook") {
        this.setState({ active: "recipebook" });
      } else if (current === "following") {
        this.setState({ active: "following" });
      } else {
        this.setState({ active: "recipes" });
      }
    }

  }

  onFollowClick = (e) => {
    e.preventDefault();
    this.props.followUser(this.props.user.info.id);
    this.props.addFollowing({ _id: this.props.user.info.id, username: this.props.user.info.username });
  }

  onUnfollowClick = (e) => {
    e.preventDefault();
    this.props.unfollowUser(this.props.user.info.id);
    this.props.removeFollowing(this.props.user.info.id);
  }

  render() {
    const user = this.props.user.info;
    let isFollowing = false;
    if (user.username) {
      user.followers.forEach(follower => {
        if (follower.username === this.props.auth.user.username) {
          isFollowing = true;
        }
      })
    }

    const loading = (
      <div className="col">
        <div className="profile-header text-center h-100 d-flex justify-content-center" style={{ background: "#3097d1", minHeight: "310px" }}>
          <Spinner color="white" />
        </div>
      </div>
    );

    const loaded = (

      <div className="col">
        <div className="profile-header text-center" style={{ background: "#3097d1" }}>
          <div className="container-fluid">
            <div className="container-inner">
              <img className="rounded-circle media-object" src={user.img_url ? user.img_url : "https://fillmurray.com/200/200"} alt="Profile" />
              <h3 className="profile-header-user" style={{ position: "relative" }}>
                {user.name}
                {
                  user.username !== this.props.auth.user.username ?
                    isFollowing
                      ? <button tile="Unfollow" style={{ position: "absolute", marginLeft: "10px" }} className="btn btn-pill btn-info mb-2" onClick={this.onUnfollowClick}><i style={{ color: "gold" }} className="fas fa-user-check"></i></button>
                      : <button title="Follow" style={{ position: "absolute", marginLeft: "10px" }} className="btn btn-pill btn-info mb-2" onClick={this.onFollowClick}><i className="fas fa-user-plus"></i></button>
                    : <Link style={{ position: "absolute", marginLeft: "10px" }} title="Edit User Info" to={`/edit/${this.props.auth.user.username}`} className="btn btn-pill btn-info mb-2"><i className="fas fa-cog"></i></Link>
                }
              </h3>
              <p className="small text-white">{user.username && `@${user.username}`}</p>
              <p className="profile-header-bio">{user.blurb && `"${user.blurb}"`}</p>
            </div>
          </div>
          <nav className="profile-header-nav">
            <ul className="nav nav-tabs justify-content-center" onClick={this.navClick}>
              <li className="nav-item">
                <Link
                  className={classnames("nav-link", {
                    "active": this.state.active === "recipes",
                  })}
                  to={`/profile/${this.props.user.info.username}`}
                  title="Recipes"
                >
                  <i className="fas fa-list-ul no-pointer-events"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={classnames("nav-link", {
                    "active": this.state.active === "recipebook"
                  })}
                  to={`/profile/${this.props.user.info.username}/recipebook`}
                  title="Recipe Book"
                >
                  <i className="fas fa-book-open no-pointer-events"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={classnames("nav-link", {
                    "active": this.state.active === "following"
                  })}
                  to={`/profile/${this.props.user.info.username}/following`}
                  title="Following">
                  <i className="fas fa-users no-pointer-events"></i>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )

    return (
      <React.Fragment>
        {this.props.user.loading ? loading : loaded}
      </React.Fragment>
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

export default connect(mapStateToProps, { followUser, addFollowing, unfollowUser, removeFollowing })(Hero);