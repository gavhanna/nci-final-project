import {
  SET_USER_INFO_LOADING,
  GET_USER_INFO
}
  from "../actions/types";

const initialState = {
  info: {},
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_INFO_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_USER_INFO:
      return {
        ...state,
        info: action.payload,
        loading: false
      }
    default:
      return state;
  }
}