import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import recipesReducers from "./recipesReducers";
import recipebookReducer from "./recipebookReducer";
import userReducer from "./userReducer";
import shoppingListReducer from "./shoppingListReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  recipes: recipesReducers,
  recipebook: recipebookReducer,
  user: userReducer,
  shoppingList: shoppingListReducer
});