import axios, { AxiosResponse } from 'axios'
import { ILoginActionParams, IPersonCreateParams, LOGIN, LOGOUT, PERSON_CREATE, GET_LOGGED_IN_PERSON, AppThunk } from 'types'

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
      throw e
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
      throw e
    }
  }
}

export const personCreate = (info: IPersonCreateParams): AppThunk<void> => {
  return async (dispatch) => {
    try {
      const res: AxiosResponse = await axios.post('/api/person/create', {
        email: info.email,
        password: info.password,
        first_name: info.firstName,
        last_name: info.lastName,
      });

      if (res.status !== 200) {
        console.log('error creating person')
        return;
      }

      const payload = {
        email: info.email,
        firstName: info.firstName,
        lastName: info.lastName,
        loggedIn: true,
      }

      dispatch({
        type: PERSON_CREATE,
        payload: payload,
      })
    } catch (e) {
      console.log('error logging in ', e)
      throw e
    }
  }
}

export const getLoggedInPerson = (): AppThunk<void> => {
  return async (dispatch) => {
    try {
      const res: AxiosResponse = await axios.get('/api/get_logged_in_person');

      // No user logged in
      if (!res.data) {
        return
      }

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
      throw e
    }
  }
}