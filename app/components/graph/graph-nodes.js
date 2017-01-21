import React, { Component } from 'react';
import constants from './graph-constants';
/**
 * @extends {Component}
 */
class GraphNode extends Component {
	constructor(props) {
		super(props);
	}
	/**
	 * @param {object} this.props.node - node object 
	 */
	render() {
		const {node, i} = this.props;
		let _translate = "translate(" + (node.tx) + "," + (node.ty) + ")";
		let _style = (node.style) ? node.style : {};
		_style = (node.active) ? {} : _style;


		switch (node.type) {
			case constants.node.type.end:
				return (<g className="conceptG" transform={_translate}  >
					<circle id={"node_" + i} r="50" style={_style}></circle>
					<circle id={"node_" + i} r="30" stroke="black" strokeWidth="3" style={{ fill: "red" }} />
					<text textAnchor="middle" dy="0">
						<tspan>{node.text}</tspan>
					</text>
				</g>)
			case constants.node.type.rombus:
				_style = (node.active) ? { fill: "yellow" } : { fill: "green" }
				return (<g className="conceptG" transform={_translate} >
					<rect id={"node_" + i} x="0" y="0" width="100" height="100" rx="10" ry="10" style={_style} transform="rotate(45)"></rect>
					<text textAnchor="middle" dy="75" dx="0">
						<tspan>{node.text}</tspan>
					</text>
				</g>)
			case constants.node.type.start:
				return (<g className="conceptG" transform={_translate}  >
					<circle id={"node_" + i} r="50" style={_style}></circle>
					<text textAnchor="middle" dy="0">
						<tspan>{node.text}</tspan>
					</text>
				</g>)
			case constants.node.type.defualt:
			default: return (<g className="conceptG" transform={_translate} >
				<rect id={"node_" + i} x="-50" y="-50" width="100" height="100" rx="10" ry="10" style={_style}></rect>
				<text textAnchor="middle">
					<tspan>{node.text}</tspan>

				</text>
			</g>)
		}

	}
}
export default GraphNode;
/**
 *<marker id="end-arrow" viewBox="0 -5 10 10" refX="32" markerWidth="3.5" markerHeight="3.5" orient="auto">
					<path d="M0,-5L10,0L0,5"></path>
				</marker>
 */