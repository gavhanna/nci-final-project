import axios from "axios";
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  ADD_FOLLOWING,
  REMOVE_FOLLOWING,
  EDIT_USER,
  GET_ADMIN_DATA,
  SET_ADMIN_STATUS,
  REVOKE_ADMIN_STATUS
} from "./types";
import { createRecipeBook } from "./recipebookActions";


// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      console.log(res.data._id);
      dispatch(createRecipeBook(res.data._id))
      history.push("/login")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Login user
export const loginUser = userData => dispatch => {
  axios.post("/api/users/login", userData)
    .then(res => {
      // save to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
    )
};

// Edit current user
export const editUser = (userData, routeHistory) => dispatch => {
  axios.post("/api/users/edit", userData)
    .then(res => {

      const userData = res.data;
      delete userData.password;
      if (routeHistory) {
        routeHistory.push("/")
      }
      dispatch({
        type: EDIT_USER,
        payload: userData
      })
    }).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Add follower
export const addFollowing = (user) => dispatch => {
  dispatch({
    type: ADD_FOLLOWING,
    payload: user
  })
}

// Add follower
export const removeFollowing = (user_id, ) => dispatch => {
  dispatch({
    type: REMOVE_FOLLOWING,
    payload: user_id
  })
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Get admin data
export const getAdminData = (username) => dispatch => {
  axios.post("/api/users/admin/data")
    .then(res => {
      dispatch({
        type: GET_ADMIN_DATA,
        payload: res.data
      })
    }).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Set Admin Status
export const setAdminStatus = (username) => dispatch => {
  axios.post("/api/users/admin/add", { username })
    .then(res => {
      dispatch({
        type: SET_ADMIN_STATUS,
        payload: res.data
      })
    }).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Revoke Admin Status
export const revokeAdminStatus = (username) => dispatch => {
  axios.post("/api/users/admin/remove", { username })
    .then(res => {
      dispatch({
        type: REVOKE_ADMIN_STATUS,
        payload: res.data
      })
    }).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}



// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove authorisation header from axios
  setAuthToken(false);
  // Set current user to empty object
  dispatch(setCurrentUser({}));
}