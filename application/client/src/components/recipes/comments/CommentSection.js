import React, { Component } from 'react'
import Comment from "./Comment"
import CommentInput from "./CommentInput"

class CommentSection extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row mt-5 mb-5">
          <div className="col-sm-10 col-md-6 m-auto">
            <h2 className="m-auto title-font">Comments</h2>
            {
              this.props.comments && this.props.comments.length > 0
                ? this.props.comments.map((comment, i) => <Comment key={i} comment={comment} />)
                : <p>No Comments Yet</p>
            }

            <CommentInput recipe_id={this.props.reciep_id} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default CommentSection;