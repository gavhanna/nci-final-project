import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      email: "",
      blurb: "",
      password: "",
      password2: "",
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    console.log(newUser);

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <div className="container-fill-height landing-page">
          <div className="container-content-middle text-center">
            <h1 className="title-font" style={{ fontSize: "5rem" }}>Create an account</h1>
            <p>Please enter your details</p>
            <div className="row">
              <div className="col-sm-8 col-md-3 col-xs-10 m-auto">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      name="name"
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name
                      })}
                      id="name"
                      placeholder="Enter name"
                      value={this.state.name}
                      onChange={this.onChange} />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                  </div>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      name="username"
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.username
                      })}
                      id="username"
                      placeholder="Enter username"
                      value={this.state.username}
                      onChange={this.onChange} />
                    {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                  </div>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      name="email"
                      type="email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email
                      })}
                      id="email"
                      placeholder="example@email.com"
                      value={this.state.email}
                      onChange={this.onChange} />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      name="password"
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password
                      })}
                      id="password"
                      value={this.state.password}
                      onChange={this.onChange} />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      name="password2"
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password2
                      })}
                      id="password2"
                      value={this.state.password2}
                      onChange={this.onChange} />
                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                  </div>
                  <button type="submit" className="btn btn-lg btn-pill btn-info">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));