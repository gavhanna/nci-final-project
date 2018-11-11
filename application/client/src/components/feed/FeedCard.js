import React from 'react'
import Link from 'react-router-dom/Link';

class FeedCard extends React.Component {
  render() {
    const { recipe } = this.props;
    return (
      <div className="card m-5 bg-dark">
        <div className="card-header d-flex justify-content-center flex-wrap">
          <h2 className="title-font">{recipe.title}</h2>
          <span className="p-2 ml-2">
            by <Link to={`/profile/${recipe.user_id.username}`}>{recipe.user_id.username}</Link>
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
        <div className="card-footer justify-content-center d-flex">
          <Link to={`/recipe/show/${recipe._id}`} className="btn btn-pill btn-primary">View</Link>
        </div>
      </div>
    )
  }
}

export default FeedCard;