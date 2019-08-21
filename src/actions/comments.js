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

function newComment(payload) {
	return {
		type: NEW_COMMENT,
		payload
	}
}


export const getComments = (id) => (dispatch) => {

	request(`${serverUrl}/tickets/${id}/comments`)
		.then(response => {
			const action = allComments(response.body)

			dispatch(action)
		})
		.catch(console.error)
}

export const createComment = (data) => (dispatch, getState) => {
	const state = getState()
	const { user } = state

	request
		.post(`${serverUrl}/comments`)
		.set('Authorization', `Bearer ${user.jwt}`)
		.send(data)
		.then(response => {
			const action = newComment(response.body)

			dispatch(action)
		})
		.catch(console.error)
}


