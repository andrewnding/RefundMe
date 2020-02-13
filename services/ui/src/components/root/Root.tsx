import * as React from 'react'
import { IRoot } from 'components/root/RootContainer'

const Root = ({ getLoggedInPerson }: IRoot) => {
  React.useEffect(() => {
    getLoggedInPerson()
  }, [])

  return (
    <div></div>
  )
}

export default Root