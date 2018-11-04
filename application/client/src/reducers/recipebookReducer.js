import {
  ADD_TO_RECIPE_BOOK,
  GET_USER_RECIPE_BOOK,
  CREATE_RECIPE_BOOK
}
  from "../actions/types";

const initialState = {
  selected: [],
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_RECIPE_BOOK:
      return {
        ...state,
        loading: false
      }
    case GET_USER_RECIPE_BOOK:
      return {
        ...state,
        selected: action.payload,
        loading: false
      }
    case ADD_TO_RECIPE_BOOK:
      return {
        ...state,
        selected: [...state.selected, action.payload],
        loading: false
      }
    default:
      return state;
  }
}