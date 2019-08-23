import * as request from 'superagent'
import { serverUrl } from '../serverUrl';

export const ALL_COMMENTS = 'ALL_COMMENTS'
export const NEW_COMMENT = 'NEW_COMMENT'
export const COMMENT_FETCHED = 'COMMENT_FETCHED'

function allComments(payload) {
	return {
		type: ALL_COMMENTS,
		payload
	}
}

// to read all comments of a ticket
export const getComments = (id) => async (dispatch) => {
	await request(`${serverUrl}/tickets/${id}/comments`)
		.then(response => {
			const action = allComments(response.body)

			dispatch(action)
		})
		.catch(console.error)
}


// to post a new comment on the ticket
export const createComment = (data) => async (dispatch, getState) => {
	const state = getState()
	const { user } = state

	await request
		.post(`${serverUrl}/comments`)
		.set('Authorization', `Bearer ${user.jwt}`)
		.send(data)
		.then(response => {
		})
		.catch(console.error)
}


