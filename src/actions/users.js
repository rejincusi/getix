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


// to create new user
export const signup = (email, password, name, imageUrl) => async dispatch => {
  await request
    .post(`${serverUrl}/users`)
    .send({ email, password, name, imageUrl })
    .then(res => {
      const action = signupSuccess(res.body)

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


// to login the new created account
export const login = (email, password) => async dispatch => {
  await request
    .post(`${serverUrl}/login`)
    .send({ email, password })
    .then(res => {
      const action = loginSuccess(res.body)

      localStorage.setItem('user', JSON.stringify(res.body))

      dispatch(action)
    })
    .catch(err => {
      if (err.message === 'Bad Request') {
        alert('Your email or password is incorrect!')
      }
      console.error(err)
    })
}