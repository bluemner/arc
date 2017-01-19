import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import Navigation from './navigation';
import Footer from './footer';
import SideBar from './sidebar';

/**
 * @extends {Component}
 */
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show_side_bar: true
		}
	}
	componentWillMount() {
	}
	set_side_bar() {
		this.state.show_side_bar = !this.state.show_side_bar;
		this.forceUpdate();
	}
	render() {
		const {store, history} = this.props;
		let sidebar = (this.state.show_side_bar) ? 'col-sm-10 col-sm-offset-2' : "col-sm-11 col-sm-offset-0";
		let icon = (this.state.show_side_bar) ? "hidden-xs col-sm-1 hidden" : "hidden-xs col-sm-1 ";
		return (
			<div>
				<Navigation />
				<div id="show-side-bar-icon" className={icon}>
					<span id="show-side-bar" className="glyphicon glyphicon-chevron-right glyphicon-side-bar" onClick={(e) => { this.set_side_bar() } } ></span>
				</div>
				<div>
					<div id="main-wrapper" className="container-fluid ">
						<div className="row ">
							<SideBar set_side_bar={this.set_side_bar.bind(this)} show_side_bar={this.state.show_side_bar} />
							<div id="content" className={sidebar + "  col-xs-offset-0 col-md-10  main"} >
								<main>
									{this.props.children}
								</main>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default App;