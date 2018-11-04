import React from 'react'
import Link from 'react-router-dom/Link';

class FeedCard extends React.Component {
  render() {
    const { recipe } = this.props;
    return (
      <div className="card m-4">
        <div className="card-header d-flex justify-content-center flex-wrap">
          <h2 className="title-font">{recipe.title}</h2> <span className="p-2 ml-2"> by <Link to={`/profile/${recipe.user_id.username}`}>{recipe.user_id.username}</Link></span>
        </div>
        <div className="card-body d-flex flex-md-row flex-column">
          <div className="col-md-4 col-12" style={{ maxWidth: "300px", margin: "auto" }}>
            <img className="img-fluid" src={recipe.img_url} alt={recipe.title} />
          </div>
          <div className="p-3 col-md-4 col-12 text-center text-sm-center text-md-left text-lg-left text-xl-left" >
            <p className="card-text">{recipe.desc}</p>
            <p className="card-text">Prep time: {recipe.preptime} mins</p>
            <p className="card-text">Cook time: {recipe.cooktime} mins</p>
            <p className="card-text">Serves: {recipe.serves}</p>
          </div>
          <div className="p-3 col-md-4 col-12 text-center text-sm-center text-md-left text-lg-left text-xl-left" >
            <p className="card-text">Dietary: {recipe.dietary}</p>
            <p className="card-text">Meal: {recipe.meal}</p>
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