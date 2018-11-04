import {
  SET_USER_INFO_LOADING,
  GET_USER_INFO,
  FOLLOW_USER,
  UNFOLLOW_USER
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
    case FOLLOW_USER:
      return {
        ...state,
        info: {
          ...state.info,
          followers: [
            ...state.info.followers,
            {
              _id: action.payload._id, username: action.payload.username
            }
          ]
        },
        loading: false
      }
    case UNFOLLOW_USER:
      console.log(action.payload);
      const followerList = state.info.followers.filter(item => {
        return item._id !== action.payload._id
      })
      return {
        ...state,
        info: {
          ...state.info,
          followers: followerList
        },
        loading: false
      }
    default:
      return state;
  }
}