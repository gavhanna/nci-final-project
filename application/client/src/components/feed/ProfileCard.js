import React, { Component } from 'react'
import {Link} from "react-router-dom";

class ProfileCard extends Component {
  render() {
    return (
      <Link to={`/profile/${this.props.user.username}/recipes`}>
      <div 
      className="card mt-5 bg-info text-white d-none d-sm-block" 
      style={{ width: "16%", position: "fixed" }}>
        <img 
          className="card-img-top m-auto pt-2 mb-2"
          src={this.props.user.img_url} 
          alt="User Profile" 
          style={{width: "90%", height: "auto", paddingLeft: "8%"}} />
        <div className="card-body p-2 text-center">
          <p className="card-text">{this.props.user.name}</p>
          <small className="card-text">@{this.props.user.username}</small><br />
          <small className="card-text">{this.props.recipes.length} recipes</small><br />
          <small className="card-text">{this.props.user.followers.length} followers </small><br />
          <small className="card-text">{this.props.user.following.length} following </small><br />
        </div>
      </div>
      </Link>
    )
  }
}


export default ProfileCard;