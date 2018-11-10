import React, { Component } from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/feed");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="container-fill-height landing-page">
        <div className="container-content-middle text-center">
          <h1 className="title-font" style={{ fontSize: "5rem" }}>Login</h1>
          <p>Please enter your details</p>
          <div className="row m-0">
            <div className="col-sm-8 col-md-3 col-xs-10 m-auto">
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    name="email"
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    id="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.onChange} />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
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
                <button type="submit" className="btn btn-lg btn-pill btn-info p-2">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);