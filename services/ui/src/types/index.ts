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

export interface ILoginAction {
  email: string,
  password: string,
}

interface LoginAction {
  type: typeof LOGIN,
  payload: ILoginAction,
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