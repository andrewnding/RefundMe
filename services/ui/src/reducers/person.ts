import { PersonType, LOGIN, LOGOUT, PersonActionTypes } from '../types/index'

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
        ...action.payload,
      }
    case LOGOUT:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}

export default personReducer;