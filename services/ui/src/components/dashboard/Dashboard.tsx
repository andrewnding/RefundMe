import * as React from 'react';
import Login from 'components/plaid/Login';

const Dashboard = () => {
  React.useEffect(() => {
    console.log(document.cookie)
  })

  return (
    <div>
        Dashboard Page
        <Login />
    </div>
  )
}

export default Dashboard;