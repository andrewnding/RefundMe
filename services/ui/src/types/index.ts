import { Action } from 'redux'
import rootReducer from 'reducers/index'
import { ThunkAction } from 'redux-thunk'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export interface PersonType {
  email: string,
  firstName: string,
  lastName: string,
  loggedIn: boolean,
}

interface LoginAction {
  type: typeof LOGIN,
  payload: PersonType,
}

interface LogoutAction {
  type: typeof LOGOUT,
}

export type PersonActionTypes = LoginAction | LogoutAction

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  Action<string>
>