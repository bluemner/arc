import React, { Component } from 'react';
import constants from './graph-constants';
/**
 * @extends {Component}
 */
class GraphNode extends Component {
	constructor(props) {
		super(props);
	}

	getText(text) {

		let _text = [];
		let _words = "";
		text.split(" ").map((word, i) => {
			if ((_words.length + word.length) > 15) {
				_text.push(<tspan key={_text.length + 1}>{_words}</tspan>)
				_words = "";
				_words += " " + word;
			} else {
				_words += " " + word;
			}

		})
		_text.push(<tspan key={_text.length + 1} x={0} y={_text.length * 15}>{_words}</tspan>);
		return _text //<tspan>{text}</tspan>
	}
	/**
	 * @param {object} this.props.node - node object 
	 */
	render() {
		const { node, i } = this.props;
		let _translate = "translate(" + (node.tx) + "," + (node.ty) + ")";
		let _style = (node.style) ? node.style : {};
		_style = (node.active) ? {} : _style;

		switch (node.type) {
			case constants.node.type.end:
				return (<g id={"node_" + node.id} className="conceptG" transform={_translate}  >
					<circle id={"node_" + node.id} r="50" style={_style}></circle>
					<circle id={"node_" + node.id} r="30" stroke="black" strokeWidth="3" style={{ fill: "red" }} />
					<text textAnchor="middle" dy="0">
						{this.getText(node.text)}
					</text>
				</g>)
			case constants.node.type.rhombus:
				_style = (node.active) ? { fill: "yellow" } : { fill: "green" }
				return (<g id={"node_" + node.id} className="conceptG" transform={_translate} >
					<rect id={"node_" + node.id} x="0" y="0" width="100" height="100" rx="10" ry="10" style={_style} transform="rotate(45)"></rect>
					<text textAnchor="middle" dy="75" dx="0">
						{this.getText(node.text)}
					</text>
				</g>)
			case constants.node.type.start:
				return (<g id={"node_" + node.id} className="conceptG" transform={_translate}  >
					<circle id={"node_" + node.id} r="50" style={_style}></circle>
					<text textAnchor="middle" dy="0">
						{this.getText(node.text)}

					</text>
				</g>)
			case constants.node.type.entity:
				// Database entity 
				return (
					<g id={"node_" + node.id} className="conceptG" transform={_translate} >
						<rect id={"node_" + node.id} x="-50" y="-50" width={this.entity_width(node.fields)} height={entity_height(node.fields)} rx="10" ry="10" style={_style}></rect>
						<text ></text>
						<text textAnchor="middle">
							{
								this.getText(node.text)
							}
						</text>
					</g>
				)
			case constants.node.type.default:
			default: return (<g id={"node_" + node.id} className="conceptG" transform={_translate} >
				<rect id={"node_" + node.id} x="-50" y="-50" width="100" height="100" rx="10" ry="10" style={_style}></rect>
				<text textAnchor="middle">
					{
						this.getText(node.text)
					}

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