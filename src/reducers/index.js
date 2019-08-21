import { combineReducers } from 'redux'
import events from './events'
import user from './user'
import event from './event'
import tickets from './tickets'
import ticket from './ticket'
import comments from './comments'

export default combineReducers({
  events,
  event,
  user,
  ticket,
  tickets,
  comments
})
