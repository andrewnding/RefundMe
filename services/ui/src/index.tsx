import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import defaultReducer from './reducers/index'

import App from "./components/App";
import './styles/index.scss';

const defaultStore = createStore(defaultReducer)

ReactDOM.render(
    <Provider store={defaultStore}>
        <App />
    </Provider>,
    document.getElementById("root")
);