import { combineReducers } from 'redux'
import personReducer from 'reducers/person'

const rootReducer = combineReducers({
  person: personReducer,
})

export default rootReducer