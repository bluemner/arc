import React, { Component } from 'react';
import constants from './graph-constants';

/** 
 * Draws edges on the screen
 * @extends {Component}
 */
class GraphEdge extends Component {
	/**
	 * @override
	 */
	constructor(props) {
		super(props);
	}
	/**
	 * @param {object} this.props.edge - edge object
	 * @param {i} this.props.edge - edge object 
	 */
	render() {
		const {edge, i} = this.props;
		let y2 = edge.target.ty;
		let y1 = edge.source.ty;
		let x2 = edge.target.tx;
		let x1 = edge.source.tx;
		let dy = y2 - y1;
		let dx = x2 - x1;

		let augemnet_x = (dx < 0) ? 0 : 50;

		let augemnet_y = (dy < 0) ? 0 : 50;
		let _d = "M" + edge.source.tx + "," + edge.source.ty + "L" + edge.target.tx + "," + edge.target.ty;
		if (edge.source.type === constants.node.type.rombus)
			_d = "M" + edge.source.tx + "," + (edge.source.ty + 75) + "L" + edge.target.tx + "," + edge.target.ty;
		return (<g key={i} id={"edge_" + edge.id}>
			<path className="link" id={"edge_" + edge.id} d={_d} style={{ "markerEnd": "url(\"#end-arrow\")" }}></path>
		</g>)


	}
}
export default GraphEdge;
