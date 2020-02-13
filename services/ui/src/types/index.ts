import { Action } from 'redux'
import rootReducer from 'reducers/index'
import { ThunkAction } from 'redux-thunk'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const GET_LOGGED_IN_PERSON = 'GET_LOGGED_IN_PERSON'

export interface PersonType {
  email: string,
  firstName: string,
  lastName: string,
  loggedIn: boolean,
}

export interface ILoginActionParams {
  email: string,
  password: string,
}

interface LoginAction {
  type: typeof LOGIN,
  payload: PersonType,
}

interface LogoutAction {
  type: typeof LOGOUT,
}

interface GetLoggedInPersonAction {
  type: typeof GET_LOGGED_IN_PERSON,
  payload: PersonType,
}

export type PersonActionTypes = LoginAction | LogoutAction | GetLoggedInPersonAction

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  Action<string>
>