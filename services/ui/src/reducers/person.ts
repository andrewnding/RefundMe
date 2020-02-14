import { PersonType, LOGIN, LOGOUT, PERSON_CREATE, GET_LOGGED_IN_PERSON, PersonActionTypes } from 'types'

const initialState: PersonType = {
  email: '',
  firstName: '',
  lastName: '',
  loggedIn: false,
}

const personReducer = (state: PersonType = initialState, action: PersonActionTypes): PersonType => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        loggedIn: action.payload.loggedIn,
      }
    case LOGOUT:
      return {
        ...state,
        ...initialState,
      }
    case PERSON_CREATE:
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        loggedIn: action.payload.loggedIn,
      }   
    case GET_LOGGED_IN_PERSON:
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        loggedIn: action.payload.loggedIn,
      }
    default:
      return state;
  }
}

export default personReducer;