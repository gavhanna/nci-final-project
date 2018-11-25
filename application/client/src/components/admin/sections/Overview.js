import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Overview extends Component {
  render() {
    return (
      <div className="col">
        <h2 className="title-font text-center">Overview</h2>
        <ul className="list-group">
          <Link to="/admin/users">
            <li className="list-group-item">
              <p>Users: {this.props.auth.admin.users && this.props.auth.admin.users.length}</p>
            </li>
          </Link>
          <Link to="/admin/recipes">
            <li className="list-group-item">
              <p>Recipes: {this.props.auth.admin.recipes && this.props.auth.admin.recipes.length}</p>
            </li>
          </Link>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Overview);
