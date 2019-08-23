import { ALL_TICKETS } from '../actions/tickets'

export default function (state = [], action = {}) {
  switch (action.type) {
    case ALL_TICKETS:
      return action.payload
    default:
      return state
  }
}