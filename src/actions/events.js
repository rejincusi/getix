import * as request from 'superagent'
import { serverUrl } from '../serverUrl';

export const ALL_EVENTS = 'ALL_EVENTS'
export const NEW_EVENT = 'NEW_EVENT'
export const EVENT_FETCHED = 'EVENT_FETCHED'

function allEvents(payload) {
	return {
		type: ALL_EVENTS,
		payload
	}
}

function newEvent(payload) {
	return {
		type: NEW_EVENT,
		payload
	}
}

function eventFetched(payload) {
	return {
		type: EVENT_FETCHED,
		payload
	}
}

// to read all the events
export const getEvents = () => async (dispatch, getState) => {
	const state = getState()
	const { events } = state

	if (!events.length) {
		await request(`${serverUrl}/events`)
			.then(response => {
				const action = allEvents(response.body)

				dispatch(action)
			})
			.catch(console.error)
	}
}	

// to create a new event
export const createEvent = (data) => async (dispatch, getState) => {
	const state = getState()
	const { user } = state

	await request
		.post(`${serverUrl}/events`)
		.set('Authorization', `Bearer ${user.jwt}`)
		.send(data)
		.then(response => {
			const action = newEvent(response.body)

			dispatch(action)
		})
		.catch(console.error)
}


// to read an event 
export const loadEvent = (id) => async (dispatch, getState) => {

	await request(`${serverUrl}/events/${id}`)
		.then(response => {
			dispatch(eventFetched(response.body))
		})
		.catch(console.error)
}

