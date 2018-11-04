import axios from "axios";

import {
  GET_USER_INFO,
  SET_USER_INFO_LOADING
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


// Recipe loading
export const setUserInfoLoading = () => {
  return {
    type: SET_USER_INFO_LOADING
  };
};