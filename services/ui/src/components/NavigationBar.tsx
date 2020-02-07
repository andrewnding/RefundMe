import * as React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => (
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
          <Link
            to="/login"
            className="nav-link"
          >
            Login
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default NavigationBar;