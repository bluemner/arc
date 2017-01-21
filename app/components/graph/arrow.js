import React, { Component } from 'react';

/**
 * @extends {Component}
 */
class Arrow extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<defs>
			<marker id="end-arrow" viewBox="0 -5 10 10" strokeWidth="1px" refX="32" markerWidth="3.5" markerHeight="3.5" orient="auto">
				<path xmlns="http://www.w3.org/2000/svg" d="M0,-5L10,0L0,5" />
			</marker>

			<marker xmlns="http://www.w3.org/2000/svg" strokeWidth="1px" id="triangle" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="strokeWidth" markerWidth="4" markerHeight="3" orient="auto">
				<path d="M 0 0 L 10 5 L 0 10 z" />
			</marker>

		

		</defs>
		);
	}
}
export default Arrow;

/**
			<marker id="mark-end-arrow" viewBox="0 -5 10 10" refX="7" markerWidth="3.5" markerHeight="3.5" orient="auto">
				<path d="M0,-5 L10,0 L0,5"></path>
			</marker>
			<marker id="test-arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth" viewBox="0 0 20 20">
				<path d="M0,0 L0,6 L9,3 z" fill="#f00" />
			</marker>
			<marker id="markerCircle" markerWidth="8" markerHeight="8" refX="5" refY="5">
				<circle cx="5" cy="5" r="3" style={{stroke: "none", fill:"#000000"}}/>
			</marker>

	<marker id="markerArrow" strokeWidth="1px" markerWidth="17" markerHeight="13" refX="2" refY="6" orient="auto">
		{
			//<path d="M2,2 L2,11 L10,6 L2,2" style={{fill: "#000000"}} />
		}
			<path d="M2,2 L2,11 L10,6 L2,2" style={{fill: "#000000"}} />
	</marker>
 */