import React, { Component } from 'react'
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAdminData } from "../../actions/authActions"
import Dash from './Dash';
import UserSection from "./sections/UserSection";
import RecipeSection from "./sections/RecipeSection";
import Overview from "./sections/Overview";

class AdminPanel extends Component {
  componentDidMount() {
    if (!this.props.auth.user.admin) {
      window.location.href = "/";
    }
    this.props.getAdminData(this.props.auth.user.username);
  }

  render() {

    const isAdmin = (
      <div className="container m-0 p-0">
        <div className="row">
          <div className="col-12 bg-primary text-white"
          // style={{ minHeight: "100vh" }}
          >
            <h1 className="title-font text-center m-5">Admin Panel</h1>
            <Dash />
          </div>
          <div className="col-12 mt-5">
            <Route exact path="/admin/" component={Overview} />
            <Route path="/admin/users" component={UserSection} />
            <Route path="/admin/recipes" component={RecipeSection} />
          </div>
        </div>
      </div>
    );

    const isNotAdmin = (
      <h1 className="text-center m-5">Access Denied, Redirecting</h1>
    )

    return (
      <React.Fragment>
        {
          this.props.auth.user.admin ?
            isAdmin : isNotAdmin
        }
      </React.Fragment>
    )
  }
}

AdminPanel.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { getAdminData })(AdminPanel);
