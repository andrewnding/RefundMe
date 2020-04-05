import { GET_PERSON_ITEMS_ACTION, ItemType, ItemActionTypes} from 'types'

const initialState: ItemType = {
  byId: {},
}

const personReducer = (state: ItemType = initialState, action: ItemActionTypes): ItemType => {
  switch (action.type) {
    case GET_PERSON_ITEMS_ACTION:
      const nextState = action.payload.reduce((acc, curr) => {
        acc.byId[curr.item_id] = {
          item_id: curr.item_id,
          institution_id: curr.institution_id
        }
        return acc
      }, {...state, byId: {...state.byId}})

      return nextState
    default:
      return state;
  }
}

export default personReducer;