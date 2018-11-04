import axios from "axios";

import {
  GET_USER_INFO,
  SET_USER_INFO_LOADING,
  FOLLOW_USER,
  UNFOLLOW_USER
} from "./types"

// Create recipe book
export const getUserInfo = username => dispatch => {
  dispatch(setUserInfoLoading());
  axios.get(`${window.location.origin}/api/users/username/${username}`)
    .then(res => {
      dispatch({
        type: GET_USER_INFO,
        payload: res.data
      })
    }).catch(err => console.log(err))
}

// Follow a user
export const followUser = user_id => dispatch => {
  dispatch(setUserInfoLoading());
  axios.post("/api/users/follow", { user_id })
    .then(res => {
      dispatch({
        type: FOLLOW_USER,
        payload: res.data
      })
    }).catch(err => console.log(err))
}

// Follow a user
export const unfollowUser = user_id => dispatch => {
  dispatch(setUserInfoLoading());
  axios.post("/api/users/follow", { user_id })
    .then(res => {
      dispatch({
        type: UNFOLLOW_USER,
        payload: res.data
      })
    }).catch(err => console.log(err))
}


// Recipe loading
export const setUserInfoLoading = () => {
  return {
    type: SET_USER_INFO_LOADING
  };
};