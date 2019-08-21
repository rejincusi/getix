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


export const getEvents = () => (dispatch, getState) => {
	const state = getState()
	const { events } = state

	if (!events.length) {
		request(`${serverUrl}/events`)
			.then(response => {
				const action = allEvents(response.body)

				dispatch(action)
			})
			.catch(console.error)
	}
}

export const createEvent = (data) => (dispatch, getState) => {
	const state = getState()
	const { user } = state

	request
		.post(`${serverUrl}/events`)
		.set('Authorization', `Bearer ${user.jwt}`)
		.send(data)
		.then(response => {
			const action = newEvent(response.body)

			dispatch(action)
		})
		.catch(console.error)
}

export const loadEvent = (id) => (dispatch, getState) => {
	const state = getState().event
	if (state && state.id === id) return

	request(`${serverUrl}/events/${id}`)
		.then(response => {
			dispatch(eventFetched(response.body))
		})
		.catch(console.error)
}

