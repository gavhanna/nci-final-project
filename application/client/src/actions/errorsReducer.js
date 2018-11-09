import { GET_ERRORS } from "./types";

export const setErrors = errors => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: errors
  })
}