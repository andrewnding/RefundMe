import axios, { AxiosResponse } from 'axios'
import { GET_PERSON_ITEMS_ACTION, ItemType, ItemActionTypes, AppThunk} from 'types'

export const getPersonItems = (): AppThunk<void> => {
  return async (dispatch) => {
    try {
      const res: AxiosResponse = await axios.get('/api/plaid/person/items')
      const items = res.data

      dispatch({
        type: GET_PERSON_ITEMS_ACTION,
        payload: items,
      })
    } catch (e) {
      console.log('error logging in ', e)
      throw e
    }
  }
}