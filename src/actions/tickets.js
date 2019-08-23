import * as request from 'superagent'
import { serverUrl } from '../serverUrl';

export const ALL_TICKETS = 'ALL_TICKETS'
export const NEW_TICKET = 'NEW_TICKET'
export const TICKET_FETCHED = 'TICKET_FETCHED'
export const TICKET_UPDATE_SUCCESS = 'TICKET_UPDATE_SUCCESS'


export function allTickets(payload) {
	return {
		type: ALL_TICKETS,
		payload
	}
}

function ticketFetched(payload) {
	return {
		type: TICKET_FETCHED,
		payload
	}
}

// to get all tickets
export const getTickets = (id) => async (dispatch, getState) => {
	const state = getState()
	const { tickets } = state

	if (!tickets.length) {
		await request(`${serverUrl}/events/${id}/tickets`)
			.then(response => {
				const action = allTickets(response.body)

				dispatch(action)
			})
			.catch(console.error)
	}
}

// to make single ticket
export const createTicket = (data) => async (dispatch, getState) => {
	const state = getState()
	const { user } = state

	await request
		.post(`${serverUrl}/tickets`)
		.set('Authorization', `Bearer ${user.jwt}`)
		.send(data)
		.then(response => {
		})
		.catch(console.error)
}

// to read single ticket detail
export const loadTicket = (id) => async (dispatch, getState) => {
	await request(`${serverUrl}/tickets/${id}`)
		.then(response => {
			dispatch(ticketFetched(response.body))
		})
		.catch(console.error)
}

// call to edit ticket
export const updateTicket = (id, data) => async (dispatch, getState) => {
	const state = getState()
	const { user } = state

	await	request
		.put(`${serverUrl}/tickets/${id}`)
		.set('Authorization', `Bearer ${user.jwt}`)
		.send(data)
		.then(response => {
		})
		.catch(console.error)
}

