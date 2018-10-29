import axios from "axios";

import { GET_CURRENT_USER_RECIPES, GET_SPECIFIC_RECIPE } from "./types";


// Get logged in user's recipes
export const getUserRecipes = (user_id) => dispatch => {
  axios
    .get("/api/recipes/" + user_id)
    .then(res =>
      dispatch({
        type: GET_CURRENT_USER_RECIPES,
        payload: res.data
      }))
}

// Get specific recipe
export const getSpecificRecipe = (recipe_id) => dispatch => {
  axios
    .get("/api/recipes/recipe/" + recipe_id)
    .then(res => {
      console.log(res, "THIS IS IT HERE");
      dispatch({
        type: GET_SPECIFIC_RECIPE,
        payload: res.data
      })
    }).catch(err => console.log(err))
}
