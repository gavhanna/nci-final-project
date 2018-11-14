import axios from "axios";

import {
  ADD_TO_RECIPE_BOOK,
  SET_RECIPEBOOK_LOADING,
  GET_USER_RECIPE_BOOK,
  CREATE_RECIPE_BOOK,
  REMOVE_RECIPE_FROM_RECIPEBOOK,
  GET_CURRENT_USER_RECIPEBOOK
} from "./types"

// Create recipe book
export const createRecipeBook = user_id => dispatch => {
  axios.post("api/recipebooks/create", { user_id })
    .then(res => {
      console.log(res);
      dispatch({
        type: CREATE_RECIPE_BOOK,
        payload: res.data
      })
    }).catch(err => console.log(err))
}

// Get user's recipe book
export const getUserRecipeBook = (user_id) => dispatch => {
  dispatch(setRecipebookLoading());
  axios.get("/api/recipebooks/" + user_id)
    .then(res => {
      dispatch({
        type: GET_USER_RECIPE_BOOK,
        payload: res.data
      })
    }).catch(err => console.log(err))
}

// Get current logged-in user's recipe book
export const getCurrentUserRecipeBook = (user_id) => dispatch => {
  dispatch(setRecipebookLoading());
  axios.get("/api/recipebooks/" + user_id)
    .then(res => {
      dispatch({
        type: GET_CURRENT_USER_RECIPEBOOK,
        payload: res.data
      })
    }).catch(err => console.log(err))
}

// Add recipe to recipe book
export const addToRecipeBook = (recipe_id) => dispatch => {
  dispatch(setRecipebookLoading());
  axios.post(window.location.origin + "/api/recipebooks/add", { recipe_id })
    .then(res => {
      dispatch({
        type: ADD_TO_RECIPE_BOOK,
        payload: res.response.data
      })
    }).catch(err => console.log(err))
}

// Remove recipe from recipebook
export const removeRecipeFromRecipebook = recipe_id => dispatch => {
  dispatch(setRecipebookLoading());
  axios.post(window.location.origin + "/api/recipebooks/remove", { recipe_id })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: REMOVE_RECIPE_FROM_RECIPEBOOK,
        payload: res.data
      })
    }).catch(err => console.log(err))
}

// Recipe loading
export const setRecipebookLoading = () => {
  return {
    type: SET_RECIPEBOOK_LOADING
  };
};