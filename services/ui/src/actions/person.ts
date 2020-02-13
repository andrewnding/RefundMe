import axios, { AxiosResponse } from 'axios'
import { ILoginActionParams, LOGIN, LOGOUT, GET_LOGGED_IN_PERSON, AppThunk } from 'types'

export const personLogin = (credentials: ILoginActionParams): AppThunk<void> => {
  return async (dispatch) => {
    try {
      const res: AxiosResponse = await axios.post('/api/login', {
        email: credentials.email,
        password: credentials.password,
      });

      const payload = {
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        loggedIn: true,
      }

      dispatch({
        type: LOGIN,
        payload: payload,
      })
    } catch (e) {
      console.log('error logging in ', e)
    }
  }
}

export const personLogout = (): AppThunk<void> => {
  return async (dispatch) => {
    try {
      const res: AxiosResponse = await axios.post('/api/logout');

      dispatch({
        type: LOGOUT,
      })
    } catch (e) {
      console.log('error logging out ', e)
    }
  }
}

export const getLoggedInPerson = (): AppThunk<void> => {
  return async (dispatch) => {
    try {
      const res: AxiosResponse = await axios.get('/api/get_logged_in_person');

      const payload = {
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        loggedIn: true,
      }

      dispatch({
        type: GET_LOGGED_IN_PERSON,
        payload: payload,
      })
    } catch (e) {
      console.log('error getting logged in person ', e)
    }
  }
}