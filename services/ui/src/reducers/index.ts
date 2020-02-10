import { combineReducers } from 'redux'
import personReducer from './person'

const rootReducer = combineReducers({
  person: personReducer,
})

export default rootReducer