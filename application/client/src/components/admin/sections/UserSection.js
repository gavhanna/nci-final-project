import React, { Component } from 'react'
import { connect } from "react-redux";
import { setAdminStatus, revokeAdminStatus } from "../../../actions/authActions";
import UserSectionTableRow from './UserSectionTableRow';
import DonutChart from '../charts/DonutChart';
import BarChart from '../charts/BarChart';
import Spinner from '../../common/Spinner';

class UserSection extends Component {
  constructor() {
    super();
    this.state = {
      usersTotal: 0,
      recipesTotal: 0,
      commentsTotal: 0,
      likesTotal: 0,
      loading: true
    }
  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.auth.admin.users) {

      const commentsTotal = this.props.auth.admin.recipes.reduce((acc, recipe) => {
        return acc += recipe.comments.length;
      }, 0)
      const likesTotal = this.props.auth.admin.recipes.reduce((acc, recipe) => {
        return acc += recipe.likes.length;
      }, 0)
      this.setState({
        usersTotal: this.props.auth.admin.users.length,
        recipesTotal: this.props.auth.admin.recipes.length,
        commentsTotal,
        likesTotal,
        loading: false
      })
    }

  }

  componentWillReceiveProps = (nextProps) => {
    const commentsTotal = nextProps.auth.admin.recipes.reduce((acc, recipe) => {
      return acc += recipe.comments.length;
    }, 0)
    const likesTotal = nextProps.auth.admin.recipes.reduce((acc, recipe) => {
      return acc += recipe.likes.length;
    }, 0)
    this.setState({
      usersTotal: nextProps.auth.admin.users.length,
      recipesTotal: nextProps.auth.admin.recipes.length,
      commentsTotal,
      likesTotal,
      loading: false
    })
  }


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
      <React.Fragment>

        {
          this.state.loading ? <Spinner /> :
            <div className="col">
              <h3 className="text-center">Users</h3>
              <BarChart
                categories={["Users", "Recipes", "Comments", "Likes"]}
                name={"User Data Counts"}
                data={[
                  this.state.usersTotal,
                  this.state.recipesTotal,
                  this.state.commentsTotal,
                  this.state.likesTotal
                ]} />

              <h3 className="text-center">Users List</h3>
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
        }
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
  nothing: {}
})

export default connect(mapStateToProps, { setAdminStatus, revokeAdminStatus })(UserSection);