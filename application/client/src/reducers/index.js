import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import recipesReducers from "./recipesReducers";
import recipebookReducer from "./recipebookReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  recipes: recipesReducers,
  recipebook: recipebookReducer
});