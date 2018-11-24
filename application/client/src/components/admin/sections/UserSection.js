import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAdminStatus, revokeAdminStatus } from "../../../actions/authActions";
import UserSectionTableRow from './UserSectionTableRow';

class UserSection extends Component {

  setAdmin = username => {
    if (window.confirm("Give user Admin status?")) {

      this.props.setAdminStatus(username);
    }
  }

  revokeAdmin = username => {
    if (window.confirm("Revoke user Admin status?")) {
      this.props.revokeAdminStatus(username);
    }
  }

  render() {
    return (
      <div className="col">
        <h3 className="text-center">Users</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Admin</th>
              <th scope="col">Profile</th>
            </tr>
          </thead>
          <tbody>
            {/* intentionally not showing the currentl logged in user so
            they cant accidentally revoke their own admin rights */}
            {this.props.auth.admin.users && this.props.auth.admin.users.map(user => (
              user.username !== this.props.auth.user.username ?
                <UserSectionTableRow
                  key={user._id}
                  user={user}
                  setAdminStatus={this.setAdmin}
                  revokeAdminStatus={this.revokeAdmin}
                />
                : null
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { setAdminStatus, revokeAdminStatus })(UserSection);