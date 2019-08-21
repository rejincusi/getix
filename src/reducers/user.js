import { LOGIN_SUCCESS, SIGNUP_SUCCESS } from '../actions/users'

export default function (state = {}, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload
    case SIGNUP_SUCCESS:
      return action.payload
    default:
      return state
  }
}