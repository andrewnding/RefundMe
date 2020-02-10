import * as React from 'react';

const Dashboard = () => {
  React.useEffect(() => {
    console.log(document.cookie)
  })

  return (
    <div>
        Dashboard Page
    </div>
  )
}

export default Dashboard;