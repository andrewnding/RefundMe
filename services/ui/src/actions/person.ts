import axios, { AxiosResponse } from 'axios'
import { ILoginAction, LOGIN, LOGOUT, AppThunk } from 'types'

export const personLogin = (credentials: ILoginAction): AppThunk<void> => {
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
      console.log('res', res)
      dispatch({
        type: LOGOUT,
      })
    } catch (e) {
      console.log('error logging in ', e)
    }
  }
}