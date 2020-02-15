import * as React from 'react';
import { Link } from 'react-router-dom';
import { INavigationBar } from 'components/navigation-bar/NavigationBarContainer'
import { useHistory } from 'react-router-dom'

const NavigationBar = ({email, firstName, lastName, loggedIn, personLogout}: INavigationBar) => {
  const history = useHistory()

  const onLogoutHandler = async () => {
    try {
      await personLogout()
      history.push('/')
    } catch (e) {
      console.log('Error logging out')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link
        to="/"
        className="navbar-brand"
      >
        Home
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link
              to="/login"
              className="nav-link"
            >
              Login
            </Link>
          </li>
          {
            loggedIn && <li className="nav-item">
              <button className="btn" onClick={onLogoutHandler}>Logout</button>
            </li> 
          }
          {
            loggedIn &&
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-link"
              >
                Dashboard
              </Link>
            </li>
          }
          {
            loggedIn &&
            <li className="nav-item">
              <Link
                to="/account"
                className="nav-link"
              >
                {firstName}
              </Link>
            </li>
          }
        </ul>
      </div>
    </nav>
  )
}

export default NavigationBar;