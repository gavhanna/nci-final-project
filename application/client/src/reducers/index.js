import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import recipesReducers from "./recipesReducers";
import recipebookReducer from "./recipebookReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  recipes: recipesReducers,
  recipebook: recipebookReducer,
  user: userReducer
});