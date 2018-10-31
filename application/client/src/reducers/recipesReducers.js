import { GET_CURRENT_USER_RECIPES, GET_SPECIFIC_RECIPE, CREATE_NEW_RECIPE, DELETE_RECIPE, CLEAR_SELECTED_RECIPE, EDIT_RECIPE } from "../actions/types";

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
    case DELETE_RECIPE:
      const copy = state.recipes.filter(rec => rec._id !== action.payload);
      return {
        ...state,
        recipes: [...copy]
      }
    case CLEAR_SELECTED_RECIPE:
      return {
        ...state,
        selectedRecipe: {}
      }
    case EDIT_RECIPE:
      const recipesCopy = state.recipe.map(recipe => {
        if (recipe._id === action.payload._id) {
          return action.payload
        } else {
          return recipe;
        }
      })
      return {
        ...state,
        recipes: recipesCopy
      }
    default:
      return state;
  }
}