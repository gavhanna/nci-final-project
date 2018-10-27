import React, { Component } from 'react'

class Register extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fill-height landing-page">
          <div className="container-content-middle text-center">
            <h1 className="title-font" style={{ fontSize: "5rem" }}>Create an account</h1>
            <p>Please enter your details</p>
            <div className="row">
              <div className="col-sm-8 col-md-3 col-xs-10 m-auto">
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input name="name" type="text" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name" />
                  </div>
                  <div className="form-group">
                    <label for="email">Email address</label>
                    <input name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp"
                      placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label for="password">Password</label>
                    <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label for="password2">Confirm Password</label>
                    <input name="password2" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
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

export default Register;