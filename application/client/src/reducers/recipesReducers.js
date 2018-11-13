import {
  GET_CURRENT_USER_RECIPES,
  GET_SPECIFIC_RECIPE,
  CREATE_NEW_RECIPE,
  DELETE_RECIPE,
  CLEAR_SELECTED_RECIPE,
  EDIT_RECIPE,
  SET_RECIPES_LOADING,
  GET_USER_RECIPES,
  GET_RECENT_RECIPES,
  CREATE_COMMENT,
  DELETE_COMMENT,
  LIKE_RECIPE,
  UNLIKE_RECIPE,
  EDIT_COMMENT
}
  from "../actions/types";

const initialState = {
  recipes: [],
  selectedRecipe: {},
  loading: false,
  recentRecipes: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RECIPES_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_USER_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false
      }
    case GET_CURRENT_USER_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false
      };
    case GET_RECENT_RECIPES:
      return {
        ...state,
        loading: false,
        recentRecipes: action.payload
      }
    case GET_SPECIFIC_RECIPE:
      return {
        ...state,
        selectedRecipe: action.payload[0],
        loading: false
      }
    case CREATE_NEW_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
        loading: false
      }
    case DELETE_RECIPE:
      const copy = state.recipes.filter(rec => rec._id !== action.payload);
      return {
        ...state,
        recipes: [...copy],
        loading: false
      }

    case LIKE_RECIPE:
      return {
        ...state,
        selectedRecipe: action.payload,
        loading: false
      }
    case UNLIKE_RECIPE:
      return {
        ...state,
        selectedRecipe: action.payload,
        loading: false
      }
    case CLEAR_SELECTED_RECIPE:
      return {
        ...state,
        selectedRecipe: {},
        loading: false
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
        recipes: recipesCopy,
        loading: false
      }
    case CREATE_COMMENT:
      return {
        ...state,
        selectedRecipe: action.payload,
        loading: false
      }
    case DELETE_COMMENT:
      return {
        ...state,
        selectedRecipe: action.payload,
        loading: false
      }
    case EDIT_COMMENT:
      return {
        ...state,
        selectedRecipe: action.payload,
        loading: false
      }
    default:
      return state;
  }
}