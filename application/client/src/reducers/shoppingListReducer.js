import {
  CREATE_SHOPPING_LIST,
  GET_SHOPPING_LIST,
  CLEAR_SHOPPING_LIST,
  PICKUP_ITEM,
  PUTBACK_ITEM,
  SET_SHOPPING_LIST_LOADING,
  ADD_TO_SHOPPING_LIST,
  DELETE_SHOPPING_LIST_ITEM
}
  from "../actions/types";

const initialState = {
  shoppingList: [],
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_SHOPPING_LIST:
      return {
        ...state,
        loading: false
      }
    case CLEAR_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: action.payload,
        loading: false
      }
    case PICKUP_ITEM:
      return {
        ...state,
        shoppingList: action.payload,
        loading: false
      }
    case PUTBACK_ITEM:
      return {
        ...state,
        shoppingList: action.payload,
        loading: false
      }
    case ADD_TO_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: action.payload,
        loading: false
      }
    case GET_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: action.payload,
        loading: false
      }
    case DELETE_SHOPPING_LIST_ITEM:
      return {
        ...state,
        shoppingList: action.payload,
        loading: false
      }
    case SET_SHOPPING_LIST_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}