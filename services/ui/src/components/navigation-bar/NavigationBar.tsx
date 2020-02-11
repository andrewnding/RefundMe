import * as React from 'react';
import { Link } from 'react-router-dom';
import { INavigationBar } from 'components/navigation-bar/NavigationBarContainer'

const NavigationBar = ({email, firstName, lastName, loggedIn, personLogout}: INavigationBar) => (
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
        <li className="nav-item active">
          {
            loggedIn ?
            <Link
              to="/account"
              className="nav-link"
            >
              {firstName}
            </Link> :
            <Link
              to="/login"
              className="nav-link"
            >
              Login
            </Link>
          }
        </li>
        <li className="nav-item">
          <button className="btn" onClick={personLogout}>Logout</button>
        </li> 
        <li className="nav-item">
          <Link
            to="/dashboard"
            className="nav-link"
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default NavigationBar;