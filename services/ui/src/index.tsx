import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import defaultReducer from './reducers/index'

import App from "./components/App";
import LoginPage from "./components/LoginPage";
import './styles/index.scss';

const defaultStore = createStore(defaultReducer)

ReactDOM.render(
    <Provider store={defaultStore}>
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={LoginPage} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);