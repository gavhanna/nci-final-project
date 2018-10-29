import { GET_CURRENT_USER_RECIPES, GET_SPECIFIC_RECIPE, CREATE_NEW_RECIPE } from "../actions/types";

const initialState = {
  recipes: [],
  selectedRecipe: {},
  loading: false
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
    case CREATE_NEW_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    default:
      return state;
  }
}