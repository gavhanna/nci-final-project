import React, { Component } from 'react';
import { storage } from "../../../../utils/firebase"

class editProfile extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      url: ""
    }
  }
  onFileSelected = (e) => {
    if (e.target.files[0]) {

      this.setState({ image: e.target.files[0] })
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
      },
      (err) => { console.log(err) },
      () => {
        // complete function
        storage.ref("images").child(image.name).getDownloadURL().then(url => {
          console.log(url);
          this.setState({ url })
        })
      });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <label>Example file input</label>
          <input type="file" className="form-control-file" onChange={this.onFileSelected} />
        </div>
        <button>Submit</button>
      </form>
    )
  }
}

export default editProfile;