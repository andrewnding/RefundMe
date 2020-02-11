import axios, { AxiosResponse } from 'axios'
import { PersonType, PersonActionTypes, LOGIN, LOGOUT, AppThunk } from 'types'

export const personLogin = (person: PersonType): PersonActionTypes => {
  return {
    type: LOGIN,
    payload: person,
  }
}

export const personLogout = (): AppThunk<void> => {
  return async (dispatch, getState) => {
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