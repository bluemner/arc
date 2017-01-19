import React, { Component } from 'react';

/**
 * @extends {Component}
 */
class SideBar extends Component {
	constructor(props) {
		super(props);

	}
	componentWillMount() {
	}

	/**
	 * 
	 * @override
	 */
	render() {
		const { set_side_bar, show_side_bar } = this.props;
		let _side = (show_side_bar) ? "col-xs-0 col-sm-2 sidebar hidden-xs" : "hidden"
		return (
			<div id="side-bar" className={_side}>
				<span id="hide-side-bar" onClick={(e) => { set_side_bar(e) } } className="hide-side-bar-icon-show glyphicon glyphicon-chevron-left glyphicon-side-bar"></span>
				<ul className="nav nav-sidebar">
					<li id="Home" className="active"><a href="/">Home<span className="sr-only">(current) </span></a></li>
				</ul>
			</div>
		);
	}
}
export default SideBar;