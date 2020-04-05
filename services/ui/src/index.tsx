import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import rootReducer from 'reducers/index'

import RootContainer from "components/root/RootContainer";
import NavigationBarContainer from 'components/navigation-bar/NavigationBarContainer'
import App from "components/App";
import LoginPage from "components/login/LoginPage";
import SignUpPage from "components/sign-up/SignUpPage";
import Dashboard from 'components/dashboard/Dashboard'
import AccountPage from 'components/account/AccountPage';
import 'styles/index.scss';

const middlewares = [thunk]
const middlewareEnhancer = applyMiddleware(...middlewares)
const enhancers = [middlewareEnhancer]
const composedEnhancers = composeWithDevTools(...enhancers)
const defaultStore = createStore(rootReducer, composedEnhancers)

ReactDOM.render(
    <Provider store={defaultStore}>
      <RootContainer />
      <Router>
        <NavigationBarContainer />
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/account" component={AccountPage} />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById("root")
);