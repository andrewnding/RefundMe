import * as React from 'react';
import LoginBoxContainer from 'components/plaid/LoginBoxContainer';
import ItemListContainer from 'components/dashboard/item/ItemListContainer';

const Dashboard = () => {
  return (
    <div>
        Dashboard Page
        <ItemListContainer />
        <LoginBoxContainer />
    </div>
  )
}

export default Dashboard;