import axios from "axios";

import {
  GET_CURRENT_USER_RECIPES,
  GET_SPECIFIC_RECIPE,
  CREATE_NEW_RECIPE,
  GET_ERRORS,
  DELETE_RECIPE,
  CLEAR_SELECTED_RECIPE,
  EDIT_RECIPE,
  SET_RECIPES_LOADING,
  GET_USER_RECIPES
} from "./types";


// Get logged in user's recipes
export const getUserRecipes = (user_id) => dispatch => {
  dispatch(setRecipesLoading());
  axios
    .get("/api/recipes/" + user_id)
    .then(res =>
      dispatch({
        type: GET_CURRENT_USER_RECIPES,
        payload: res.data
      }))
}

// Get logged in user's recipes
export const getRecipesByUsername = (username) => dispatch => {
  dispatch(setRecipesLoading());
  axios
    .get("/api/recipes/user/" + username)
    .then(res => {
      dispatch({
        type: GET_USER_RECIPES,
        payload: res.data
      })
    }

    )
}

// Get specific recipe
export const getSpecificRecipe = (recipe_id) => dispatch => {
  dispatch(setRecipesLoading());
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
export const createNewRecipe = (recipeData, history) => dispatch => {
  dispatch(setRecipesLoading());
  axios
    .post("/api/recipes/create", recipeData)
    .then(res => {
      history.push('/profile');
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

// Delete Recipe
// post api/recipes/delete
export const deleteRecipe = (recipe_id, routeHistory) => dispatch => {
  dispatch(setRecipesLoading());
  axios.delete(window.location.origin + "/api/recipes/delete/" + recipe_id)
    .then(res => {
      if (routeHistory) {
        routeHistory.push("/profile")
      }
      dispatch({
        type: DELETE_RECIPE,
        payload: recipe_id
      })
    })
    .catch(err => console.log(err))
}

// Clear selectedRecipe from store
export const clearSelectedRecipe = () => dispatch => {
  dispatch(setRecipesLoading());
  dispatch({
    type: CLEAR_SELECTED_RECIPE,
    payload: null
  })
}

// Edit specific recipe
export const editRecipe = (recipeData, routeHistory) => dispatch => {
  dispatch(setRecipesLoading());
  axios.post(window.location.origin + "/api/recipes/edit", recipeData)
    .then(res => {
      routeHistory.push("/recipe/show/" + res.data._id)
      dispatch({
        type: EDIT_RECIPE,
        payload: res.data
      })
      routeHistory.push("/api/recipe/show/" + res.data._id);
    }).catch(err => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
    }
    )
}

// Recipe loading
export const setRecipesLoading = () => {
  return {
    type: SET_RECIPES_LOADING
  };
};