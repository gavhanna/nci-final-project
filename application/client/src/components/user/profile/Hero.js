import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { followUser, unfollowUser } from "../../../actions/userActions"
import { removeFollowing, addFollowing } from "../../../actions/authActions"

class Hero extends Component {
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

    return (
      <div className="col">
        <div className="profile-header text-center" style={{ background: "#3097d1" }}>
          <div className="container-fluid">
            <div className="container-inner">
              <img className="rounded-circle media-object" src={user.img_url ? user.img_url : "https://fillmurray.com/200/200"} alt="Profile" />
              <h3 className="profile-header-user">{user.name}</h3>
              <p className="small text-white">{user.username && `@${user.username}`}</p>
              <p className="profile-header-bio">{user.blurb && `"${user.blurb}"`}</p>
              {
                user.username !== this.props.auth.user.username ?
                  isFollowing
                    ? <button className="btn btn-pill btn-warning mb-2" onClick={this.onUnfollowClick}>Unfollow</button>
                    : <button className="btn btn-pill btn-info mb-2" onClick={this.onFollowClick}>Follow</button>
                  : <Link title="Edit User Info" to={`/edit/${this.props.auth.user.username}`} className="btn btn-pill btn-info mb-2"><i className="fas fa-cog"></i></Link>
              }
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

export default connect(mapStateToProps, { followUser, addFollowing, unfollowUser, removeFollowing })(Hero);