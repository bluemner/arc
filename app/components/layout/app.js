import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import Navigation from './navigation'
import Footer from './footer'
class App extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
	}
	render() {
		const {store, history} = this.props;
		return (
			<div>
				<Navigation />

				<div className="main-container">
					{this.props.children}
				</div>
				<Footer />
			</div>
		);
	}
}
export default App;