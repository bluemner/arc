import React, { Component } from 'react';

/**
 * @extends {Component}
 */
class Navigation extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
	}
	render() {

		return (
			<nav className="navbar navbar-default navbar-inverse navbar-fixed-top navigation-template">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigationbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href=" ">Arc</a>
					</div>
					<div id="navigationbar" className="collapse navbar-collapse">
						<ul id="nav-bar-links" className="nav navbar-nav">
							<li><a href="/">Home</a></li>

						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
export default Navigation;