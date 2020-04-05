import { connect } from 'react-redux'
import ItemList from 'components/dashboard/item/ItemList'
import { getPersonItems } from 'actions/item'
import { ItemByIdType, RootState } from 'types'

interface StateProps {
  items: ItemByIdType
}

interface DispatchProps {
  getPersonItems: () => any,
}

interface OwnProps {}

export interface IItemList extends StateProps, DispatchProps, OwnProps {}

const mapStateToProps: (state: RootState) => StateProps = (state: RootState) => {
  return {
    items: state.item.byId
  }
}

const mapDispatchToProps: (dispatch: any) => DispatchProps = (dispatch: any) => {
  return {
    getPersonItems: () => dispatch(getPersonItems()),
  }
}

const ItemListContainer = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ItemList)

export default ItemListContainer