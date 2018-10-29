import axios from "axios";

import { GET_CURRENT_USER_RECIPES, GET_SPECIFIC_RECIPE, CREATE_NEW_RECIPE, GET_ERRORS } from "./types";


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
      dispatch({
        type: GET_SPECIFIC_RECIPE,
        payload: res.data
      })
    }).catch(err => console.log(err))
}

// Create new recipe
export const createNewRecipe = (recipeData) => dispatch => {
  axios
    .post("/api/recipes/create", recipeData)
    .then(res => {
      dispatch({
        type: CREATE_NEW_RECIPE,
        payload: res.data
      })
    }).catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
    )
}
