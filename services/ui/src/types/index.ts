import { Action } from 'redux'
import rootReducer from 'reducers/index'
import { ThunkAction } from 'redux-thunk'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const PERSON_CREATE = 'PERSON_CREATE'
export const GET_LOGGED_IN_PERSON = 'GET_LOGGED_IN_PERSON'
export const GET_PERSON_ITEMS_ACTION = 'GET_PERSON_ITEMS_ACTION'

export interface PersonType {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  loggedIn: boolean,
}

export interface ILoginActionParams {
  email: string,
  password: string,
}

export interface IPersonCreateParams {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
}

interface LoginAction {
  type: typeof LOGIN,
  payload: PersonType,
}

interface LogoutAction {
  type: typeof LOGOUT,
}

interface PersonCreateAction {
  type: typeof PERSON_CREATE,
  payload: PersonType,
}

interface GetLoggedInPersonAction {
  type: typeof GET_LOGGED_IN_PERSON,
  payload: PersonType,
}

export type PersonActionTypes = LoginAction | LogoutAction | PersonCreateAction | GetLoggedInPersonAction

export interface ItemType {
  byId: ItemByIdType
}

export interface ItemByIdType {
  [key: string]: ItemByIdDataType,
}

export interface ItemByIdDataType {
  item_id: string,
  institution_id: string,
}

interface GetPersonItemsAction {
  type: typeof GET_PERSON_ITEMS_ACTION,
  payload: ItemByIdDataType[],
}

export type ItemActionTypes = GetPersonItemsAction

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  Action<string>
>