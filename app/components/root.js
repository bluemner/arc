import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './layout/app';
import Home from './home'
import Applications from './applications.jsx'
class Root extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
	}
	render() {
		const { store, history } = this.props;
		return (
			<div className="Root">
				<Provider store={store}>
					<Router history={history}>
						<Route component={App}>
							<Route path="/Applications" component={Applications} />
							<Route path="/" component={Home} />
							<Route path="*" component={Home} />

						</Route>
					</Router>
				</Provider>
			</div>
		);
	}
}
export default Root;