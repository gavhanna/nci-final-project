import {
  ADD_TO_RECIPE_BOOK,
  GET_USER_RECIPE_BOOK,
  CREATE_RECIPE_BOOK,
  REMOVE_RECIPE_FROM_RECIPEBOOK
}
  from "../actions/types";

const initialState = {
  selected: {},
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
        selected: {
          ...state.selected,
          recipes: [...state.selected.recipes, action.payload]
        },
        loading: false
      }
    case REMOVE_RECIPE_FROM_RECIPEBOOK:
      return {
        ...state,
        selected: {
          ...state.selected,
          recipes: [...action.payload.recipes]
        }
      }
    default:
      return state;
  }
}