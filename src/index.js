import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import { Router, browserHistory } from 'react-router'

import { routes } from './core/routes'



// import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
// const history = createHistory();

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router history={browserHistory} routes={routes}>
        </Router>
    </Provider>,
    document.getElementById('root')
);
// registerServiceWorker();
serviceWorker.register();
