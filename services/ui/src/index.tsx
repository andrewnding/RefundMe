import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import rootReducer from './reducers/index'

import App from "components/App";
import LoginPage from "components/login/LoginPage";
import Dashboard from 'components/Dashboard'
import NavigationBar from 'components/NavigationBar'
import 'styles/index.scss';

const defaultStore = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={defaultStore}>
        <Router>
            <NavigationBar />
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);