import { ALL_TICKETS } from '../actions/tickets'

export default function (state = [], action = {}) {
  switch (action.type) {
    case ALL_TICKETS:
      return action.payload
    // case NEW_TICKET:
    //   return [action.payload, ...state]
    default:
      return state
  }
}