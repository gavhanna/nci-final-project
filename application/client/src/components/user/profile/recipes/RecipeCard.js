import React from 'react'
import Link from 'react-router-dom/Link';

function RecipeCard(props) {
  return (
    <div className="col-sm-12 col-md-6 col-lg-4 m-auto">
      <div className="card mt-3">
        <img className="card-img-top" src="https://fillmurray.com/500/200" alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title">{props.recipe.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.recipe.meal}</h6>
          <p className="card-text">{props.recipe.desc}</p>
          <Link to={"/recipe/" + props.recipe._id} className="card-link">View</Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard;