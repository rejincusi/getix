import * as request from 'superagent'
import { serverUrl } from '../serverUrl';

export const ALL_TICKETS = 'ALL_TICKETS'
export const NEW_TICKET = 'NEW_TICKET'
export const TICKET_FETCHED = 'TICKET_FETCHED'
export const TICKET_UPDATE_SUCCESS = 'TICKET_UPDATE_SUCCESS'


function allTickets(payload) {
	return {
		type: ALL_TICKETS,
		payload
	}
}

function ticketUpdateSuccess(payload) {
	return {
		type: TICKET_UPDATE_SUCCESS,
		payload
	}
}

function newTicket(payload) {
	return {
		type: NEW_TICKET,
		payload
	}
}

function ticketFetched(payload) {
	return {
		type: TICKET_FETCHED,
		payload
	}
}


export const getTickets = (id) => (dispatch, getState) => {
	const state = getState()
	const { tickets } = state

	if (!tickets.length) {
		request(`${serverUrl}/events/${id}/tickets`)
			.then(response => {
				const action = allTickets(response.body)

				dispatch(action)
			})
			.catch(console.error)
	}
}

export const createTicket = (data) => (dispatch, getState) => {
	const state = getState()
	const { user } = state

	request
		.post(`${serverUrl}/tickets`)
		.set('Authorization', `Bearer ${user.jwt}`)
		.send(data)
		.then(response => {
			const action = newTicket(response.body)

			dispatch(action)
		})
		.catch(console.error)
}

export const loadTicket = (id) => (dispatch, getState) => {
	const state = getState().ticket
	if (state && state.id === id) return

	request(`${serverUrl}/tickets/${id}`)
		.then(response => {
			dispatch(ticketFetched(response.body))
		})
		.catch(console.error)
}

export const updateTicket = (id, data) => (dispatch, getState) => {
	const state = getState()
	const { user } = state

	request
		.put(`${serverUrl}/tickets/${id}`)
		.set('Authorization', `Bearer ${user.jwt}`)
		.send(data)
		.then(response => {
			dispatch(ticketUpdateSuccess(response.body))
		})
		.catch(console.error)
}

