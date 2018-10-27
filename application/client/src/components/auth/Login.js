import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <div className="container-fill-height landing-page">
        <div className="container-content-middle text-center">
          <h1 className="title-font" style={{ fontSize: "5rem" }}>Login</h1>
          <p>Please enter your details</p>
          <div className="row">
            <div className="col-sm-8 col-md-3 col-xs-10 m-auto">
              <form>
                <div className="form-group">
                  <label for="email">Email address</label>
                  <input name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp"
                    placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-lg btn-pill btn-info">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;