import React, { Component } from 'react';
import { storage } from "../../../../utils/firebase"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { editUser } from "../../../../actions/authActions"

class editProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      blurb: "",
      errors: {},
      image: null,
      file: null
    }
  }
  onFileSelected = (e) => {
    if (e.target.files[0]) {
      this.setState({
        image: e.target.files[0],
        file: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  componentDidMount() {
    const user = this.props.user.info;
    this.setState({
      name: user.name,
      username: user.username,
      blurb: user.blurb
    })
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
    const userData = {
      name: this.state.name,
      username: this.state.username,
      oldUsername: this.props.user.info.username,
      blurb: this.state.blurb,
      email: this.props.user.info.email
    }

    if (this.state.image) {

      const { image } = this.state;
      const uploadTask = storage.ref(`profile_images/${this.props.user.info.username}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
        },
        (err) => { console.log(err) },
        () => {
          // complete function
          storage.ref("profile_images").child(this.props.user.info.username).getDownloadURL().then(url => {
            // console.log(url);
            // this.setState({ url })
            userData.img_url = url;

            this.props.editUser(userData, this.props.history);
          })
        });
    } else {
      this.props.editUser(userData, this.props.history);
    }

  }

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <div className="container-fill-height landing-page">
          <div className="container-content-middle text-center">
            <h1 className="title-font" style={{ fontSize: "5rem" }}>{this.state.name}</h1>
            <p>Edit your account information</p>
            <hr />
            <div className="row">
              <div className="col-sm-8 col-md-3 col-xs-10 m-auto">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <div className="form-group">
                      {
                        this.props.user.info.img_url ?
                          <div>
                            <div>
                              <h4 className="text-center">Preview</h4>
                            </div>
                            <img src={this.state.file ? this.state.file : this.props.user.info.img_url} alt="Preview" className="m-3" style={{ width: "100px", height: "auto", borderRadius: "50%" }} />
                          </div>
                          : null
                      }
                      <label
                        htmlFor="fileinput"
                        className={classnames("btn btn-pill btn-info p-2", {
                          "btn-primary": this.state.file
                        })}
                      ><i className="fas fa-upload"></i> {this.state.file ? "Change Profile Pic" : "Profile Pic"}</label>
                      <input
                        type="file"
                        id="fileinput"
                        className="form-control-file inputfile"
                        accept="image/*"
                        onChange={this.onFileSelected}
                      />
                    </div>
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
                    <label>Blurb</label>
                    <textarea
                      name="blurb"
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.blurb
                      })}
                      id="blurb"
                      placeholder="Say whatever!"
                      value={this.state.blurb}
                      onChange={this.onChange} />
                    {errors.blurb && (<div className="invalid-feedback">{errors.blurb}</div>)}
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

editProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

export default connect(mapStateToProps, { editUser })(withRouter(editProfile));