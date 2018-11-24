import React from 'react'
import Link from 'react-router-dom/Link';
import Modal from "../../components/common/Modal"

class FeedCard extends React.Component {
  render() {
    const { recipe } = this.props;
    console.log(recipe);

    return (
      <div className="card my-5 mx-1">
        <div className="card-header bg-primary text-white d-flex justify-content-center flex-wrap pb-2">
          <h2 className="title-font ml-auto">{recipe.title}</h2>
          <span className="p-2 ml-2">
            by <Link to={`/profile/${recipe.user_id.username}`} className="text-white">{recipe.user_id.username}</Link>
          </span>
          <span style={{ cursor: "pointer" }} className="badge badge-pill badge-secondary text-white p-2 align-self-center ml-auto" data-toggle="modal" data-target={`#modal-${recipe._id}`}>
            {recipe.likes && recipe.likes.length}&nbsp;
                <i className="fas fa-heart" style={{ color: "salmon" }}></i>
          </span>
        </div>
        <div className="card-body d-flex flex-md-row flex-column">
          <div className="col-md-4 col-12" style={{ maxWidth: "300px", margin: "auto" }}>
            <img className="img-fluid" src={recipe.img_url} alt={recipe.title} />
          </div>

          <div className="col-md-8">
            <div className="row m-0 p-0 justify-content-between">
              <div className="col-12">
                <p className="h5 mt-3">{recipe.desc}</p>
              </div>
              <div className="p-3 col-md-5 col-12 text-center text-sm-center text-md-left text-lg-left text-xl-left" >
                <p className="card-text d-flex flex-row justify-content-between" style={{ borderBottom: "1px solid lightgrey" }}>
                  <span><i className="far fa-clock"></i> Prep</span>
                  <span>{recipe.preptime} mins</span>
                </p>
                <p className="card-text d-flex flex-row justify-content-between" style={{ borderBottom: "1px solid lightgrey" }}>
                  <span><i className="far fa-clock"></i> Cook</span>
                  <span>{recipe.cooktime} mins</span>
                </p>
                <p className="card-text d-flex flex-row justify-content-between" style={{ borderBottom: "1px solid lightgrey" }}>
                  <span><i className="fas fa-users"></i> Serves</span>
                  <span>{recipe.serves}</span>
                </p>
              </div>

              <div className="p-3 col-md-5 col-12 text-center text-sm-center text-md-left text-lg-left text-xl-left" >
                <p className="card-text d-flex flex-row justify-content-between" style={{ borderBottom: "1px solid lightgrey" }}>
                  <span><i className="fas fa-apple-alt"></i> Dietary</span>
                  <span>{recipe.dietary}</span>
                </p>
                <p className="card-text d-flex flex-row justify-content-between" style={{ borderBottom: "1px solid lightgrey" }}>
                  <span><i className="fas fa-utensils"></i> Meal</span>
                  <span>{recipe.meal}</span>
                </p>
                <p className="card-text d-flex flex-row justify-content-between" style={{ borderBottom: "1px solid lightgrey" }}>
                  <span><i className="far fa-comments"></i> Comments</span>
                  <span>{recipe.comments.length}</span>
                </p>
              </div>
            </div>

          </div>


        </div>
        <div className="card-footer justify-content-center bg-primary d-flex">
          <Link to={`/recipe/show/${recipe._id}`} className="btn btn-pill btn-info">View</Link>
          <Modal title="Liked by" likes={recipe.likes} id={recipe._id} />
        </div>
      </div>
    )
  }
}

export default FeedCard;