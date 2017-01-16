import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import { Provider } from 'react-redux'
import configureStore from './store/store';

import 'babel-polyfill';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import Root from './components/root';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

//  <Route path="/Arc" component={Arc} />
ReactDOM.render((
	<Root store={store} history={history} />

), document.getElementById('root'));
