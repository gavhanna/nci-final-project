import axios from "axios";

import {
  CREATE_SHOPPING_LIST,
  GET_SHOPPING_LIST,
  CLEAR_SHOPPING_LIST,
  PICKUP_ITEM,
  PUTBACK_ITEM,
  SET_SHOPPING_LIST_LOADING,
  ADD_TO_SHOPPING_LIST,
  DELETE_SHOPPING_LIST_ITEM,
  GET_ERRORS
} from "./types"

// Create shoppinglist
export const createShoppingList = user_id => dispatch => {
  dispatch(setShoppingListLoading());
  axios.post("api/shoppinglist/create", { user_id })
    .then(res => {
      dispatch({
        type: CREATE_SHOPPING_LIST,
        payload: res.data.list
      })
    }).catch(err => console.log(err))
}

// Get loggedin user's shoppinglist
export const getShoppingList = user_id => dispatch => {
  dispatch(setShoppingListLoading());
  axios.get(`api/shoppinglist/${user_id}`)
    .then(res => {
      dispatch({
        type: GET_SHOPPING_LIST,
        payload: res.data.list
      })
    }).catch(err => console.log(err))
}

// Add item to shoppinglist
export const addItemToShoppingList = item => dispatch => {
  dispatch(setShoppingListLoading());
  axios.post("api/shoppinglist/add", { item })
    .then(res => {
      dispatch({
        type: ADD_TO_SHOPPING_LIST,
        payload: res.data.list
      })
    }).catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// Pick up item
export const pickupItem = item_id => dispatch => {
  dispatch(setShoppingListLoading());
  axios.post("api/shoppinglist/pickedUp", { item_id })
    .then(res => {
      dispatch({
        type: PICKUP_ITEM,
        payload: res.data.list
      })
    }).catch(err => console.log(err))
}

// Put back item
export const putItemBack = item_id => dispatch => {
  dispatch(setShoppingListLoading());
  axios.post("api/shoppinglist/putBack", { item_id })
    .then(res => {
      dispatch({
        type: PUTBACK_ITEM,
        payload: res.data.list
      })
    }).catch(err => console.log(err))
}

// Delete item from shopping list
export const deleteItemFromShoppingList = item_id => dispatch => {
  axios.delete(`api/shoppinglist/delete/${item_id}`)
    .then(res => {
      dispatch({
        type: DELETE_SHOPPING_LIST_ITEM,
        payload: res.data.list
      })
    }).catch(err => console.log(err))
}

// Clear the shopping list
export const clearShoppingList = () => dispatch => {
  dispatch(setShoppingListLoading());
  axios.post("api/shoppinglist/clear")
    .then(res => {
      dispatch({
        type: CLEAR_SHOPPING_LIST,
        payload: res.data.list
      })
    }).catch(err => console.log(err))
}

// Shoppinglist loading
export const setShoppingListLoading = () => {
  return {
    type: SET_SHOPPING_LIST_LOADING
  };
};