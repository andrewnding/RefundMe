import { PersonType, PersonActionTypes, LOGIN, LOGOUT } from '../types/index'

export const personLogin = (person: PersonType): PersonActionTypes => {
  return {
    type: LOGIN,
    payload: person,
  }
}

export const personLogout = (person: PersonType): PersonActionTypes => {
  return {
    type: LOGOUT,
    payload: person,
  }
}