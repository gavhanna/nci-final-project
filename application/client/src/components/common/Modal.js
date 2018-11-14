import React, { Component } from 'react'

class Modal extends Component {
  // https://stackoverflow.com/questions/49515925/react-router-dom-link-on-click-close-bootstrap-modal-window
  hideActiveModal = () => {
    const modal = document.getElementsByClassName('modal show')[0];
    const fade = document.getElementsByClassName('modal-backdrop fade')[0];
    modal.className = modal.className.replace('show', '');
    fade.className = fade.className.replace('show', '');
  };
  render() {
    return (
      <React.Fragment>
        <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul className="list-group">
                  {this.props.likes && this.props.likes.map(like => (
                    <a href={`/profile/${like.username}`} key={like._id} onClick={this.hideActiveModal}>
                      <li className="list-group-item">
                      <img 
                      style={{ width: "auto", height: "30px" }} 
                      className="rounded-circle" 
                      src={like.img_url ? like.img_url : "https://fillmurray.com/100/100"} 
                      alt="User" />&nbsp;{like.username}
                      </li>
                    </a>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Modal;