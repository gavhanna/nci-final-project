import {
  SET_CURRENT_USER,
  ADD_FOLLOWING,
  REMOVE_FOLLOWING,
  EDIT_USER,
  GET_ADMIN_DATA,
  SET_ADMIN_STATUS,
  REVOKE_ADMIN_STATUS
} from "../actions/types";
import isEmpty from "../validation/isEmpty"

const initialState = {
  isAuthenticated: false,
  user: {},
  admin: {}
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
    case EDIT_USER:
      return {
        ...state,
        user: action.payload
      }
    case GET_ADMIN_DATA:
      return {
        ...state,
        admin: action.payload
      }
    case SET_ADMIN_STATUS:
    const updatedSetList = state.admin.users.map(user => {
      if (user.username === action.payload.username) {
        return action.payload
      } else {
        return user
      }
    })
      return {
        ...state,
        admin: {
          ...state.admin,
          users: updatedSetList
        }
      }
      case REVOKE_ADMIN_STATUS:
      const updatedRevokeList = state.admin.users.map(user => {
        if (user.username === action.payload.username) {
          return action.payload
        } else {
          return user
        }
      })
        return {
          ...state,
          admin: {
            ...state.admin,
            users: updatedRevokeList
          }
        }


    default:
      return state;
  }
}