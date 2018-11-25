import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Overview extends Component {
  render() {
    return (
      <div className="col text-center">
        <h2 className="title-font text-center">Overview</h2>
        <p>As an admin, you can edit or delete any user's comments or recipes.</p>
        <p>
          There are currently <Link to="/admin/users">{this.props.auth.admin.users && this.props.auth.admin.users.length} users</Link> who have published <Link to="/admin/recipes">{this.props.auth.admin.recipes && this.props.auth.admin.recipes.length} recipes</Link>.
        </p>
        <p>Each section has a graph displaying information about that set of data, and a list of links to those data points.</p>
        {/* <ul className="list-group">
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
        </ul> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Overview);
