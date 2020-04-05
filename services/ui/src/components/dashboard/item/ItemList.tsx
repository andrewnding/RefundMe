import * as React from 'react'
import Item from 'components/dashboard/item/Item'
import { IItemList } from 'components/dashboard/item/ItemListContainer'
import { ItemByIdType } from 'types'

const ItemList = ({ items, getPersonItems }: IItemList) => {
  React.useEffect(() => {
    getPersonItems()
  }, [])

  console.log('items', items)

  const renderItems = (items: ItemByIdType) => {
    return Object.keys(items).map(key => <Item key={key} item_id={key}/>)
  }

  return (
    <div>
      ItemList
      {renderItems(items)}
      <Item />
    </div>
  )
}

export default ItemList