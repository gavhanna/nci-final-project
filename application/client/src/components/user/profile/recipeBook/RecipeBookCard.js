import React from 'react'
import { Link } from "react-router-dom";

function RecipeBookCard(props) {
  return (
    <Link to={`/recipe/show/${props.recipe._id}`} style={{ color: "#333", textDecoration: "none" }}>
      <div class="row bg-light p-4 m-2" style={{ border: "1px solid grey" }}>
        <div class="col-md-10 col-sm-12 m-auto d-flex flex-column flex-md-row flex-sm-column flex-xs-column">
          <div class="col-md-2 col-sm-12">
            <img class="rounded img-fluid" src={props.recipe.img_url} alt="Card cap" />
          </div>
          <div class="col-md-4 col-sm-12 recipe-book-info d-flex flex-column">
            <h2>{props.recipe.title}</h2>
            <p>by {props.recipe.user_id.username}</p>
            <p class="d-flex justify-content-around"><span>Cook time: {props.recipe.cooktime}min </span> <span>Prep Time: {props.recipe.preptime}min</span></p>

          </div>
          <div class="col-md-6 col-sm-12">
            <p>{props.recipe.desc}</p>
            <p>{props.recipe.ingredients.length} ingredients</p>
            <p>{props.recipe.method.length} step(s)</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RecipeBookCard;