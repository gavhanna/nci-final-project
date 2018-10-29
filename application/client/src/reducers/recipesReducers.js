import { GET_CURRENT_USER_RECIPES, GET_SPECIFIC_RECIPE } from "../actions/types";

const initialState = {
  recipes: [],
  selectedRecipe: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER_RECIPES:
      return {
        ...state,
        recipes: action.payload
      };
    case GET_SPECIFIC_RECIPE:
      return {
        ...state,
        selectedRecipe: action.payload[0]
      }
    default:
      return state;
  }
}