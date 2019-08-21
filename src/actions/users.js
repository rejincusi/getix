import request from 'superagent'
import { history } from '../App';
import { serverUrl } from '../serverUrl';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

function signupSuccess(payload) {
  return {
    type: SIGNUP_SUCCESS,
    payload
  }
}

function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
}

export const signup = (email, password, name, imageUrl) => dispatch => {
  request
    .post(`${serverUrl}/users`)
    .send({ email, password, name, imageUrl })
    .then(response => {
      const action = signupSuccess(response.body)

      dispatch(action)
      history.push('/login')
    })
    .catch(err => {
      if (err.message === 'Conflict') {
        alert('This email was already used to register. Please choose another email to sign up.')
      }
      console.error(err)
    })
}

export const login = (email, password) => dispatch => {
  request
    .post(`${serverUrl}/login`)
    .send({ email, password })
    .then(response => {
      const action = loginSuccess(response.body)

      dispatch(action)
    })
    .catch(err => {
      if (err.message === 'Bad Request') {
        alert('Your email or password is incorrect!')
      }
      console.error(err)
    })
}