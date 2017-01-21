import React, { Component } from 'react';

/**
 * @extends {Component}
 */
class GraphNode extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<defs>
				<marker id="end-arrow" viewBox="0 -5 10 10" refX="32" markerWidth="3.5" markerHeight="3.5" orient="auto">
					<polygon points="0,0 50,0 25.0,43.3" ></polygon>
				</marker>
				<marker id="mark-end-arrow" viewBox="0 -5 10 10" refX="7" markerWidth="3.5" markerHeight="3.5" orient="auto">
					<path d="M0,-5L10,0L0,5"></path>
				</marker>
			</defs >
		);
	}
}
export default GraphNode;
/**
 *<marker id="end-arrow" viewBox="0 -5 10 10" refX="32" markerWidth="3.5" markerHeight="3.5" orient="auto">
					<path d="M0,-5L10,0L0,5"></path>
				</marker>
 */