import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../../common/Spinner"
import FollowCard from "./FollowCard"

class Following extends Component {
  render() {
    const loaded = (
      <div className="text-center mt-5">
        <div className="row">
          <div className="col-md-3 col-sm-12 ml-auto mt-5">
            <h3>Followers</h3>
            <ul className="media-list media-list-users list-group">
              {
                this.props.user.info.followers && this.props.user.info.followers.length > 0 ?
                  this.props.user.info.followers.map(info => {
                    return <FollowCard key={info._id} info={info} />
                  })
                  : <p>Nobody yet</p>
              }
            </ul>
          </div>
          <div className="col-md-3 col-sm-12 mr-auto mt-5">
            <h3>Following</h3>
            <ul className="media-list media-list-users list-group">
              {
                this.props.user.info.following && this.props.user.info.following.length > 0 ?
                  this.props.user.info.following.map(info => {
                    return <FollowCard key={info._id} info={info} />
                  })
                  : <p>Nobody yet</p>
              }
            </ul>
          </div>
        </div>
      </div>
    )

    return (

      <React.Fragment>
        {
          this.props.user.loading ? <Spinner /> : loaded
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

export default connect(mapStateToProps)(Following);
