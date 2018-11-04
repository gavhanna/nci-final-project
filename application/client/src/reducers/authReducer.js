import { SET_CURRENT_USER, ADD_FOLLOWING, REMOVE_FOLLOWING } from "../actions/types";
import isEmpty from "../validation/isEmpty"

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case ADD_FOLLOWING:
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload]
        }
      }
    case REMOVE_FOLLOWING:
      console.log(action.payload);
      const followingList = state.user.following.filter(item => {
        return item._id !== action.payload._id
      })
      return {
        ...state,
        user: {
          ...state.user,
          following: followingList
        }
      }

    default:
      return state;
  }
}