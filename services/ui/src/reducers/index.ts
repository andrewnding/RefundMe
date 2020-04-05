import { combineReducers } from 'redux'
import personReducer from 'reducers/person'
import itemReducer from 'reducers/item'

const rootReducer = combineReducers({
  person: personReducer,
  item: itemReducer,
})

export default rootReducer